import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchType } from '../enums/search-type.enum';
import { PokemonType } from '../models/pokemon-type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  colors = [
    { type: 'fighting', hex: '#b45c94' },
    { type: 'normal', hex: '#d3c984' },
    { type: 'flying', hex: '#8e6feb' },
    { type: 'poison', hex: '#c76dda' },
    { type: 'ground', hex: '#d8d493' },
    { type: 'bug', hex: '#fd7272' },
    { type: 'ghost', hex: '#652c5a' },
    { type: 'steel', hex: '#b5b5b5' },
    { type: 'fire', hex: '#ff7510' },
    { type: 'water', hex: '#408af8' },
    { type: 'grass', hex: '#43d469' },
    { type: 'rock', hex: '#6b6b6b' },
    { type: 'electric', hex: '#ffc107' },
    { type: 'psychic', hex: '#ec58a5' },
    { type: 'ice', hex: '#aee3f4' },
    { type: 'dragon', hex: '#1c4a8e' },
    { type: 'dark', hex: '#4e545c' },
    { type: 'fairy', hex: '#f7a296' },
    { type: 'unknown', hex: '#adadad' },
    { type: 'shadow', hex: '#313750' }

  ]
  types: Array<PokemonType> = [];


  constructor(private http: HttpClient) { this.fetchTypes() }

  fetchUrl(url) {
    return fetch(url).then((res) => res.json());
  }

  fetchPage(page: number) {

    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${page * 18}&limit=18`;
    return fetch(url).then((res) => res.json());

  }

  getPokemonByNameOrId(value: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${value}`;
    return fetch(url).then((res) => res.json());
  }

  getPokemonByType(id: number){
    const url = `https://pokeapi.co/api/v2/type/${id}`;
    return fetch(url).then((res) => res.json());
  }

  fetchTypes() {

    this.http.get<any>('https://pokeapi.co/api/v2/type').subscribe(src => {

      src.results.forEach(element => {
        let len = element.url.length;
        let tipo: PokemonType = {}
        tipo.name = element.name;
        tipo.id = element.url.substr(31, len - 31 - 1)
        this.types.push(tipo)

      });
    })
  }

  getTypes() {
    return this.types;
  }

  getTypeColor(type: string): string {

    let color: string;

    this.colors.forEach(element => {

      if (type == element.type) {
        color = element.hex;
      }
    });

    return color;

  }

}
