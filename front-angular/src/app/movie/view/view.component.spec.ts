import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieViewComponent } from './view.component';
// Apollo
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from './../../../environments/environment';

describe('MovieViewComponent', () => {
  let component: MovieViewComponent;
  let fixture: ComponentFixture<MovieViewComponent>;
  let httpMock: HttpTestingController;
  let httpLink: HttpLink;
  let apollo: Apollo;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        providers: [
          Apollo,
          HttpLink
        ],
        declarations: [MovieViewComponent]
      }
    )
      .compileComponents();

    // Apollo init
    httpMock = TestBed.get(HttpTestingController);
    httpLink = TestBed.get(HttpLink);
    apollo = TestBed.get(Apollo);
    apollo.create({
      link: httpLink.create({ uri: environment.graphqlUrl }),
      cache: new InMemoryCache()
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
