export interface Movie {
    "adult"?: boolean,
    "backdrop_path"?: string,
    "genre_ids"?: number[],
    "id": number,
    "original_language"?: string,
    "original_title"?: string,
    "overview"?: string,
    "popularity"?: number,
    "poster_path"?: string,
    "release_date": string,
    "title"?: string,
    "video"?: boolean,
    "vote_average"?: number,
    "vote_count": number,
    "user_avg_rating": number

}

export interface UserMovie {
    "id"?: number,
    "title"?: string,
    "released"?: string,
    "poster_path"?: string
}

export interface Review {
    "id"?: number,
    "review": string,
    "rating": number,
    'movie': UserMovie,
}

export interface ReviewWithUser {
    "id"?: number,
    "review": string,
    "rating": number,
    'movie': UserMovie,
    'user': User
    'created_at': string
}

export interface User {
    name: string,
    email: string,
    reviews?: Array<Review>,
    review_count?: number
}