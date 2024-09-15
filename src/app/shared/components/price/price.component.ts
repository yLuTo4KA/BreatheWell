import { Component, inject, Input } from '@angular/core';
import { Price } from 'src/app/core/models/price.model';
import { PriceService } from 'src/app/core/services/price.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent {
  @Input() sale: boolean = false;

  private priceService = inject(PriceService);

  public price: Price | null = null;

  ngOnInit(): void {
    this.price = this.priceService.getPrice('XTR');
  }

  getPrice(price: Price): string {
    if(price.attributes.sale > 0 && price.attributes.sale_price) {
      return `${price.attributes.sale_price} ${price.attributes.currency_name}`;
    } else {
      return `${price.attributes.amount} ${price.attributes.currency_name}`;
    }
  }
}
