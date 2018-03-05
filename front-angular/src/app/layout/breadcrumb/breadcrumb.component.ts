import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'layout-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Let's go!
   *
   * @class DetailComponent
   * @method ngOnInit
   */
  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB: string = "name";

    //subscribe to the NavigationEnd event
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        //set breadcrumbs
        let root: ActivatedRoute = this.activatedRoute.root;
        let fullBreadcrumbs  = this.getBreadcrumbs(root);
        // filter breadcrumbs to avoid double routes
        this.breadcrumbs = fullBreadcrumbs.filter( (item, index, array) => {
          let filter = false;
          if(item.label === '' || item.label == null) {
            filter = true;
          }
          else {
            if( (array.length-1) > index) {
              let nextItem = array[index+1];
              if(nextItem.url === item.url) {
                filter = true;
              }
            }
          }
          return !filter;
        });
      }
    });
  }

  /**
   * Returns array of IBreadcrumb objects that represent the breadcrumb.
   *
   * @class DetailComponent
   * @method getBreadcrumbs
   * @param {ActivateRoute} route
   * @param {string} url
   * @param {IBreadcrumb[]} breadcrumbs
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB: string = "name";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;


      // Create breadcrumb object
      let breadcrumb :IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      // Replace `:var` in label by its value
      Object.keys(breadcrumb.params).forEach( key => {
        breadcrumb.label = breadcrumb.label.replace(':'+ key, breadcrumb.params[key])
      });

      // save it
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
