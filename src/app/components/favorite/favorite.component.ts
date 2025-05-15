import { Component } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {

  listNews:any;
  resultListNews:any;
  next: number = 0;
  previous: number = 0;   
  last : any;

  constructor(private favorite:FavoriteService) {
    this.getFavorites(0);
  }

  getFavorites(page:any) {
    
    if(this.next === undefined) {
      this.next = 0;
      this.previous = 0;
      page = 1;
    }

    this.favorite.getNewsFavorites(page).subscribe({
      next: (result) => {
        this.resultListNews = result;
        this.listNews = this.resultListNews.content;
        this.last = this.resultListNews.last;

        this.next = this.resultListNews.number + 1;
        this.previous = this.resultListNews.number -1;
        if(this.last){
          this.next = this.resultListNews.number
        }
        
        if(this.resultListNews.number===0){
           this.previous = 0;
        }
      },
      error: (error) => {
        console.error('Error fetching news:', error);
        this.showError();
      }
    })
  }

  searchFavorite(term: any) {
    if(term.length === 0) {
      return this.getFavorites(0);
    }
   
    this.favorite.searchNewsFavorites(term, 0).subscribe({
      
      next: (result) => {
         console.log(result);
        this.resultListNews = result;
        this.listNews = this.resultListNews.content;
        this.last = this.resultListNews.last;
        //paginacion
        this.next = this.resultListNews.number + 1;
        this.previous = this.resultListNews.number;
        console.log(this.resultListNews);
      },
      error: (error) => {
        this.showError();
      }
    })
  }
  

  deleteFavorite(id:any) {
    this.favorite.delete(id).subscribe({
      next: (result) => {
        this.getFavorites(0);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Se elimino correctamente el favorito',
          footer: '<a href="">Why do I have this issue?</a>'
        })        
      },
      error: (error) => { 
        this.showError();
      }
    })
  }

  showError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
}
