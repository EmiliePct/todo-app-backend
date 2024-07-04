export interface Task {
  title: string;
  description?: string; // le ? permet de dire que c'est optionnel
  date?: Date; //à vérifier comment faire
  isDone: boolean;
}
