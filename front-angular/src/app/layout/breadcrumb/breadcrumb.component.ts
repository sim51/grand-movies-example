import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router } from '@angular/router';

interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'grand-layout-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: Array<IBreadcrumb> = [];
  routeDataBreadcrumb: string = 'name';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    // Nothing
  }

  /**
   * Let's go!
   */
  ngOnInit(): void {
    // subscribe to the NavigationEnd event
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // set breadcrumbs
        const root: ActivatedRoute = this.activatedRoute.root;
        const fullBreadcrumbs = this.getBreadcrumbs(root);

        // filter breadcrumbs to avoid double routes
        this.breadcrumbs = fullBreadcrumbs.filter(
          (item, index, array) => {

            let filter = false;
            if (item.label === 'undefined' || item.label === '') {
              filter = true;
            } else {
              if ((array.length - 1) > index) {

                const nextItem = array[index + 1];
                if (nextItem.url === item.url) {
                  filter = true;
                }
              }
            }

            return !filter;
          }
        );
      }
    });
  }

  /**
   * Returns array of IBreadcrumb objects that represent the breadcrumb.
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<IBreadcrumb> = []): Array<IBreadcrumb> {

    // get the child routes
    const children: Array<ActivatedRoute> = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(this.routeDataBreadcrumb)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join('/');

      // Create breadcrumb object
      const breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[this.routeDataBreadcrumb],
        params: child.snapshot.params,
        url: `${url}/${routeURL}`
      };

      // Replace `:var` in label by its value
      Object
        .keys(breadcrumb.params)
        .forEach(key => {
          breadcrumb.label = breadcrumb.label.replace(`:${key}`, breadcrumb.params[key]);
        });

      // save it
      breadcrumbs.push(breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
