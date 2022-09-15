import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-segundo',
  templateUrl: './segundo.component.html',
  styleUrls: ['./segundo.component.css']
})
export class SegundoComponent implements OnInit {

  teste = 'Aguardando...';

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.teste = this.route.snapshot.queryParamMap.get( 'teste' ) || 'Nenhum parâmetro recebido!';
  }
}
