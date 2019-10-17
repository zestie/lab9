import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})

export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  title: string = "";
  year: number = 0;
  ayear: number = 0;

  constructor(private dbService: DatabaseService) {}

  /** **************************************
   *          ACTORS
   *************************************** */
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.changeSection(1);
      this.onGetActors();
      this.onGetMovies();
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
    });
  }

  /** **************************************
   *       MOVIES
   *************************************** */
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Add Movie
  onSaveMovies() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.changeSection(6);
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.changeSection(6);
      this.onGetMovies();
      this.onGetActors();
    }); 
  }

  //Add Actor to movie *******
  onSelectActor(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onSelectMovie(item) {
    this.title = item.title;
    this.year = item.name;
  }
  onAddActorToMovie() {
    const obj = {title: this.title, name: this.fullName};
    this.dbService.addActor(obj).subscribe(result => {
      this.changeSection(6);
      this.onGetActors();
      this.onGetMovies();
    });
  }

  //Delete Movie by year ******* 
  onDeleteByYear() {
    this.dbService.deleteByYear(this.ayear).subscribe(result => {
      //this.changeSection(6);
      this.onGetMovies(); 
      this.onGetActors();
    });
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.title = "";
    this.year = 0;
  }
}