import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProductResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<ProductResolved>{

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = +route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product Id was not a number : ${id}`;
      console.log(message);
      return of({ product: null, error: message });
    }

    return this.productServer.getProduct(id).pipe(
      map(product => ({ product: product })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.log(message);
        return of({ product: null, error: message });
      })
    );
  }

  constructor(private productServer: ProductService) { }
}
