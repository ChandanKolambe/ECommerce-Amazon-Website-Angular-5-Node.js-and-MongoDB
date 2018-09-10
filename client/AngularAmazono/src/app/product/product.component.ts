import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;

  myReview = {
    title: '',
    description: '',
    rating: 0
  };

  btnDisabled = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.rest
        .get(`http://localhost:3030/api/product/${res['id']}`)
        .then(data => {
          console.log('data');
          console.log(data);

          data['success']
            ? (this.product = data['product'])
            : this.router.navigate(['/']);
        })
        .catch(error => this.data.error(error['message']));
    });
  }

}
