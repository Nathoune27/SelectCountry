import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Pays } from '../pays.modele';
import { Subscription, debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements AfterViewInit, OnDestroy {

  sub!: Subscription

  @ViewChild('input')
  inputText!: ElementRef;

  countries: Array<Pays> = [
    {code: "FR", libelle: "France"}, {code: "NC",libelle: "Nouvelle-Calédonie"}, {code: "US", libelle: "Etat-Unis"}
  ];

  curCountries: Array<Pays> = [];

  constructor() {}

  ngAfterViewInit() {
    this.sub = fromEvent (this.inputText.nativeElement, 'keyup')
      .pipe(
        map((x) => this.inputText.nativeElement.value)
      )
      .subscribe((x) => {
        if (x.length == 0) { 
          this.curCountries = [];
        } else {
          this.curCountries = this.countries.filter((y) => 
          y.libelle.toLowerCase().startsWith(x.toLowerCase())
        );
      }
    });
  }
  
  onBlur() {
    let blur = this;
    setTimeout(function () {
      blur.curCountries = [];
    });
  }
  
  onFocus() {
    if (this.inputText.nativeElement.value.length > 0) { 
      this.curCountries = this.countries.filter((y) => 
        y.libelle.toLowerCase().startsWith(this.inputText.nativeElement.value.toLowerCase())
      );
    }
  }

  selectCountry(event: any) {
    this.inputText.nativeElement.value = event.target.innerText;
  }

  ngOnDestroy() { 
    this.sub.unsubscribe();
    }
  }
