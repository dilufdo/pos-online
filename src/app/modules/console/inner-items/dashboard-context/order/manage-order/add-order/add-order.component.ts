import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {MatSelect} from "@angular/material/select";


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Chicken'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'tacos-2', viewValue: 'Cheese'},
  ];
  form=new FormGroup({
    item: new FormControl(),
    price: new FormControl(),
    qty: new FormControl(),

    }
  );

  formSave= new FormGroup({

    totalamount: new FormControl(''),
    discount: new FormControl(''),
    nettotal: new FormControl(''),
    paytype: new FormControl('',[Validators.required]),
    paidamount:new FormControl('',[Validators.required]),
    balanceamount:new FormControl('')
  });
  // @ts-ignore
  public itemCtr: FormControl<Food> = new FormControl<Food>(null);

  /** control for the MatSelect filter keyword */
  public itemFilterCtrl: FormControl<string | null> = new FormControl<string>('');

  /** list of banks filtered by search keyword */
  public filteredItems: ReplaySubject<Food[]> = new ReplaySubject<Food[]>(1);

  // @ts-ignore
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  ngOnInit() {
    // set initial selection
    this.itemCtr.setValue(this.foods[2]);

    // load the initial bank list
    this.filteredItems.next(this.foods.slice());

    // listen for search field value changes
    this.itemFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItems();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredItems
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Food, b: Food) => a && b && a.value === b.value;
      });
  }

  protected filterItems() {
    if (!this.foods) {
      return;
    }
    // get the search keyword
    let search = this.itemFilterCtrl.value;
    if (!search) {
      this.filteredItems.next(this.foods.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredItems.next(
      // @ts-ignore
      this.foods.filter(item => item.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
}
