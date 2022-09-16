import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-primeiro',
  templateUrl: './primeiro.component.html',
  styleUrls: ['./primeiro.component.css']
})
export class PrimeiroComponent implements OnInit {

  teste = 'Aguardando...';

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.teste = this.route.snapshot.paramMap.get( 'teste' ) || 'Nenhum parâmetro recebido!';
  }
}
