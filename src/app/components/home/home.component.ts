import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-home',
  imports: [ CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  listNews:any;
  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles/?has_event=false&has_launch=false&limit=10';
  next:any;
  previous:any;
  newsToSave:any;

  constructor(private newsService: NewsService, private favorite:FavoriteService) {
    this.getNews(this.apiUrl);

  }

  getNews(url:any){
    this.newsService.getNews(url).subscribe({
      next: (result) => {
        this.listNews = result.results
        this.next = result.next;  
        this.previous = result.next;
      },
      error: (error) => {
        console.error('Error fetching news:', error);
      }
    })
  }

  searchNews(query: string) {

    if(query.length==0) {
     return this.getNews(this.apiUrl);
    }

    this.newsService.search(query).subscribe({
      next: (result) => {
        this.listNews = result.results
        console.log('Search results:', this.listNews);
      },
      error: (error) => {
        this.showError();
      }
    })
  }

  orderingByTittle() {
    this.newsService.orderByTitle().subscribe({
      next: (result) => {
        this.listNews = result.results
        console.log('Ordered by title:', this.listNews);
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
      text: 'Algo salió mal!',
      confirmButtonText: 'OK'
    });
  }

  addFavorite(id:any) {   

    this.listNews.forEach((element:any) => {
      if (element.id == id) {
        this.newsToSave = element;

      }
    })

    let data = {     
      title: this.newsToSave.title,
      summary: this.newsToSave.summary,
      publishedAt: this.newsToSave.published_at,
      new_site: this.newsToSave.news_site,
      image_url: this.newsToSave.image_url,
      saved_at: new Date()
    }

    this.favorite.save(data).subscribe({
      next: (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Excelente!',
          text: 'Noticia guardada en favoritos',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.error('Error adding favorite:', error);
        this.showError();
      }
    });
  }
}
