<template>
  <div class="table">
  <h3>Search a title: <input v-model="filterText" /></h3>
  <h3>Sort titles by: 
    <button @click="sortLowest">Lowest Rated</button>
    <button @click="sortHighest">Highest Rated</button>
  </h3>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns" :key=key>
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredFilms" :key=entry>
        <td v-for="key in columns" :key=key>
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="controls">
  <button @click="prevPage" :disabled=isPrevDisabled>prev page</button>
  <button @click="nextPage" :disabled=isNextDisabled>next page</button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'table-table',
  data() {
    return {
      columns: ["title", "rating"],
      ratingsInfo: [
        { title: `White Chicks`, rating: 82 },
        { title: `Grey's Anatomy`, rating: 98 },
        { title: `Prison Break`, rating: 98 },
        { title: `How I Met Your Mother`, rating: 94 },
        { title: `Supernatural`, rating: 95 },
        { title: `Breaking Bad`, rating: 97 },
        { title: `The Vampire Diaries`, rating: 91 },
        { title: `The Walking Dead`, rating: 98 },
        { title: `Pretty Little Liars`, rating: 96 },
        { title: `Once Upon a Time`, rating: 98 },
        { title: `Sherlock`, rating: 95 },
        { title: `Death Note`, rating: 77 },
        { title: `Naruto`, rating: 88 },
        { title: `Arrow`, rating: 96 },
        { title: `Black Mirror`, rating: 80 },
        { title: `The Originals`, rating: 74 },
        { title: `The 100`, rating: 97 },
        { title: `Masha and the Bear`, rating: 81 },
        { title: `Hunter X Hunter`, rating: 57 },
        { title: `Marvel's Luke Cage`, rating: 95 },
        { title: `Marvel's Iron Fist`, rating: 98 }
      ],
      filterText: '',
      itemsPerPage: 5,
      page: 1,
    }
  },
  methods: {
    sortLowest() {
      this.ratingsInfo.sort((a, b) => a.rating > b.rating ? 1 : -1);
    },
    sortHighest() {
      this.ratingsInfo.sort((a, b) => a.rating < b.rating ? 1 : -1);
    },
    prevPage() {
      this.page -= 1;
    },
    nextPage() {
      this.page += 1;
    }
  },
  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  computed: {
    filteredFilms() {
      let filter = new RegExp(this.filterText, 'i')
      return this.ratingsInfo.filter(el => el.title.match(filter)).slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
    },
    isPrevDisabled() {
      return this.page === 1 ? true : false
    },
    isNextDisabled() {
      return this.filteredFilms.length < this.itemsPerPage ? true : false
    },
  },
  watch: {
    filterText() {
      this.page = 1
    }
  }
}
</script>


<style scoped>
body, button {
  font-family: 'Bitter', serif;
}

.table {
  padding: 30px;
  max-width: 400px;
  font-size: 15px;
  margin: 0 auto;
}

table {
  background: #444;
  color: white;
}

th {
  background: #333;
  text-transform: capitalize;
  text-align: left;
}

td, th {
  padding: 10px;
  border-bottom: 1px solid #888;
}

td:first-child {
  width: 300px;
  border-right: 1px solid #888;
}

tr:last-child td {
    border-bottom: none;
  }


button {
  background: orangered;
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.controls {
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
}
</style>
