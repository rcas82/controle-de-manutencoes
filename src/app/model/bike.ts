export class Bike {

  id: number;
  userId: number;
  nome: string;
  modelo: string;
  marca: string;
  data?: Date;
  valor?: number;
  descricao?: string;
  isAposentada: boolean;

  constructor(nome: string, marca: string, modelo: string) {
    this.id = 0;
    this.userId = 0;
    this.nome = nome;
    this.marca = marca;
    this.modelo = modelo;
    this.isAposentada= false;
  }

  public static clone(bike: Bike) {
    let b: Bike = new Bike(bike.nome, bike.marca, bike.modelo);
    b.id = bike.id;
    b.userId = bike.userId;
    b.data = bike.data
    b.valor = bike.valor;
    b.descricao = bike.descricao;
    b.isAposentada = bike.isAposentada;
    return b;
  }

  public static toWS(bike: Bike) {
    let b: Bike = new Bike(bike.nome, bike.marca, bike.modelo);
    b.id = bike.id;
    b.userId = bike.userId;
    b.data = bike.data
    b.valor = bike.valor;
    b.descricao = bike.descricao;
    b.isAposentada = bike.isAposentada;
    return b;
  }
}
