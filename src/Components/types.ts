export interface Excercise {
    id: string;
    ExcerciseName: string;
    Img: string;
    Reps: number;
    Describtion?: string;
    Sets: number;
}
export interface UserDbData {
    id: string;
    userName: string;
    email: string;
}

export interface Workouts {
    id: string;
    WorkOuts: Excercise[];
    image: string;
    name: string;
    user: string;
}