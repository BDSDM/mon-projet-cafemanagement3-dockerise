import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Todo, ToDoListService } from '../services/to-do-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  userId: number = 0; // ID de l'utilisateur connecté
  todos: Todo[] = []; // Liste des tâches
  newTodoTitle: string = ''; // Titre de la nouvelle tâche
  newTodoDescription: string = ''; // Description de la tâche
  newTodoCompleted: boolean = false; // État de la tâche
  userEmail: string = ''; // Email de l'utilisateur
  userName: string = '';
  pageSize = 5;
  currentPage = 0;

  constructor(
    private todoService: ToDoListService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID et l'email de l'utilisateur depuis le service d'authentification
    this.userId = this.authService.getStoredUserId();
    this.userName = this.authService.getStoredUserName();
    this.userEmail = this.authService.getStoredUserEmail() || '';
    this.getTodos();
  }
  get paginatedTodos(): Todo[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.todos.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  // Récupérer toutes les tâches pour l'utilisateur
  getTodos(): void {
    this.todoService.getTodosForUser(this.userId).subscribe(
      (data) => {
        this.todos = data;
      },
      () =>
        this.showNotification('Erreur lors du chargement des tâches', 'error')
    );
  }

  // Ajouter une nouvelle tâche
  addTodo(): void {
    if (this.newTodoTitle.trim() && this.newTodoDescription.trim()) {
      const newTodo: Todo = {
        id: 0,
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        completed: this.newTodoCompleted,
      };
      this.todoService.createTodo(newTodo, this.userEmail).subscribe(
        (createdTodo) => {
          this.todos.push(createdTodo);
          this.newTodoTitle = '';
          this.newTodoDescription = '';
          this.newTodoCompleted = false;
          this.showNotification('Tâche ajoutée avec succès', 'success');
        },
        () =>
          this.showNotification("Erreur lors de l'ajout de la tâche", 'error')
      );
    }
  }

  // Supprimer une tâche
  deleteTodo(taskId: number): void {
    this.todoService.deleteTodo(taskId).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== taskId);
        this.showNotification('Tâche supprimée', 'success');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la tâche', err);
        this.showNotification('Impossible de supprimer la tâche', 'error');
      },
    });
  }

  // Afficher une notification
  private showNotification(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }

  logout() {
    this.authService.logOut();
  }

  goToCookiesGame() {
    this.router.navigate(['/cookiesgame']);
  }

  goToProfile() {}
  goToBuyProduct() {
    this.router.navigate(['/buyproduct']);
  }

  goToProductsManagement() {
    this.router.navigate(['/productmanagement']);
  }
  goToToDoList() {
    this.router.navigate(['/todolist']);
  }

  goToUsersManagement() {
    this.router.navigate(['/usermanagement']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
