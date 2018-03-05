import uuid from 'uuid/v1';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

// Path to store files
const uploadDir = './uploads'

/**
 * Process an upload file by storing it on the filesystem.
 *
 * @param {File} upload The uploaded file
 * @return {Object} a file object
 */
export const upload = async ( upload ) => {
  const { stream, filename, mimetype, encoding } = await upload
  const { id, path } = await storeFS( { stream, filename } )
  return { id, filename, mimetype, encoding, path };
}

/**
 * Store a stream on the filesystem.
 *
 * @param {stream} stream Stream to write on the filesystem
 * @param {String} filename Filename of the
 * @return  {object} An object with the id of the file plus its path
 */
const storeFS = ( { stream, filename } ) => {
  const id = uuid();
  const date = ( new Date() ).toJSON().substring( 0, 10 );
  mkdirpSync( `${uploadDir}/${date}` );
  const path = `${uploadDir}/${date}/${id}-${filename}`;
  return new Promise( ( resolve, reject ) =>
    stream
    .on( 'error', error => {
      if ( stream.truncated )
        // Delete the truncated file
        fs.unlinkSync( path )
      reject( error )
    } )
    .on( 'end', () => resolve( { id, path } ) )
    .pipe( fs.createWriteStream( path ) )
  );
}

const mkdirSync = function ( dirPath ) {
  try {
    fs.mkdirSync( dirPath )
  } catch ( err ) {
    if ( err.code !== 'EEXIST' ) throw err
  }
}

const mkdirpSync = function ( dirPath ) {
  const parts = dirPath.split( path.sep )
  // For every part of our path, call our wrapped mkdirSync()
  // on the full path until and including that part
  for ( let i = 1; i <= parts.length; i++ ) {
    mkdirSync( path.join.apply( null, parts.slice( 0, i ) ) )
  }
}
