<template>
    <Toolbar />
    <div class="row px-2">
        <Alert v-if="movies.Response === 'False'" :alert="movies.Error"/>
        <div class="col-md-9 col-12">
            <div class="container p-3 mt-5 shadow-sm p-3 mb-5 bg-white rounded">
                <h4>Search Movie</h4>
                <form @submit.prevent="getMovie">
                    <div class="form-group">
                        <label for="title">Title:</label>
                        <input type="text" class="form-control" id="title" v-model="searchTitle" required>
                    </div>
                    <button type="submit" v-on:click="getMovie" class="btn btn-outline-primary btn-sm mt-2">Search</button>
                </form>
                <hr>
            </div>
            <div v-if="movies.Response === 'True'" class="container p-3 mt-5 shadow-sm p-3 mb-5 bg-white rounded">
                <div class="row">
                    <div class="col-lg-6 col-10">
                        <h4>Results</h4>
                        <div class="card card-details">
                            <img class="card-img-top" :height="280" :src="movies.Poster" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">{{ movies.Title }}</h5>
                            </div>
                            <div class="card-footer d-flex justify-content-end">
                                <button class="btn btn-outline-dark btn-sm" @click="saveMovie()">Save</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-10">
                        <div class="container mt-4">
                            <hr>
                            <h4 class="font-weight-bold mb-3">{{ movies.Title }}</h4>
                            <div class="d-flex flex-column">
                                <div class="d-flex mb-2">
                                    <h5>Genre:</h5>
                                    <p class="px-2">{{ movies.Genre }}</p>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5>Language:</h5>
                                    <p class="px-2">{{ movies.Language }}</p>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5>Director:</h5>
                                    <p class="px-2">{{ movies.Director }}</p>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5>Writer:</h5>
                                    <p class="px-2">{{ movies.Writer }}</p>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5>Actors:</h5>
                                    <p class="px-2">{{ movies.Actors }}</p>
                                </div>
                                <div class="d-flex mb-2">
                                    <h5>Year:</h5>
                                    <p class="px-2">{{ movies.Year }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else  class="container p-3 mt-5 shadow-sm p-3 mb-5 bg-white rounded">
                <div class="row">
                <div class="col-lg-12 col-12">
                <img class="shadow-sm mb-5 bg-white rounded image-movies" src="../../assets/images/Dalle2.png">
            </div>
        </div>
    </div>
        </div>
        <div class="col-md-3 col-12 d-flex align-items-stretch">
            <div class="container pb-3 list-movies p-3 mt-5 shadow-sm mb-5 bg-white rounded">
                <h5>Saved Films:</h5>
                <span v-if="userMovies.length === 0">0 film saved already</span>
                <div v-for="movie in userMovies">
                    <div class="card mt-3 card-list">
                        <img class="card-img-top" :height="200" :src="movie.Poster">
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.Title }}</h5>
                        </div>
                        <div class="card-footer d-flex justify-content-end">
                            <button class="btn btn-outline-dark btn-sm" @click="showDetail(movie)">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getMovieByTitle } from '@/provider/MoviesService';
import Toolbar from '@/components/Toolbar/toolbar.vue'
import Alert from '@/components/Alert/alert.vue'

export default {
    name: 'Movie',
    components: {
        Toolbar,
        Alert
    },
    data() {
        return {
            movies: {},
            searchTitle: '',
            listFavorits: [],
            userMovies: [],
            user: {}
        };
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"))
        let savedMovies = localStorage.getItem("movies")
        if (savedMovies) {
            this.listFavorits = JSON.parse(savedMovies)
            this.userMovies = this.listFavorits.filter(movie => movie.createdBy === this.user.email)
        } else {
            localStorage.setItem("movies", [])
        }
    },
    methods: {
        async getMovie() {
            this.movies = await getMovieByTitle(this.searchTitle);
        },
        saveMovie() {
            this.movies.createdBy = this.user.email
            this.listFavorits = [this.movies,...this.listFavorits]
            this.userMovies = [this.movies,...this.userMovies]
            localStorage.setItem("movies", JSON.stringify(this.listFavorits))
        },
        showDetail(movie) {
            this.movies = movie
        }
    },
};
</script>
<style>
.card-details {
    width: 20rem;
}

.card-list {
    width: 100%;
}

.list-movies {
    max-height: 125vh;
    overflow-y: auto;
}

::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 3px !important;
    border-radius: 10px;
    height: 10px;
    background: rgba(0, 0, 0, .05);
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, .1);
    border-radius: 0;
}

::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0, 0, 0, .1);
    -webkit-transition: color .2s ease;
    transition: color .2s ease;
}
.image-movies {
    width: 100%;
    height: 100%;
}
</style>