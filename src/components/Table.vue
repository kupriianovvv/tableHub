<template>
  <div class="table">
    <div class="sortings">
      <label for="sortingField">sorting Field</label>
      <select v-model="sortingField" id="sortingField">
        <option value="Name">Name</option>
        <option value="Number">Number</option>
        <option value="Distance">Distance</option>
      </select>
      <label for="sortingOrder">sorting Order</label>
      <select v-model="sortingOrder" id="sortingOrder">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <label for="filteringField">Filtering field</label>
      <select v-model="filteringField" id="filteringField">
        <option value="Name">Name</option>
        <option value="Number">Number</option>
        <option value="Distance">Distance</option>
      </select>
      <button @click="sort" id="sort">Sort</button>
    </div>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns" :key=key>
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in slicedFilteredFilms" :key=entry>
        <td v-for="key in columns" :key=key>
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
  <div class="controls">
    <button @click="prevPage" :disabled=isPrevDisabled>prev page</button>
    <input v-model="filterText" />
    <button @click="nextPage" :disabled=isNextDisabled>next page</button>
  </div>
  <div class="buttons">
    <button v-for="num in numOfButtons" :key="num" @click="onSelectPage(num)">{{num}}</button>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'table-table',
  data() {
    return {
      sortingField: "Name",
      sortingOrder: "ascending",
      filteringField: "Name",
      columns: ["Date", "Name", "Number", "Distance"],
      ratingsInfo: [
        { Date: "10:01:2011", Name: "Saint Petersburg", Number: 10, Distance: 10},
        { Date: "11:01:2011", Name: "Moscow", Number: 12, Distance: 14},
        { Date: "14:01:2011", Name: "Saratov", Number: 15, Distance: 12},
        { Date: "12:01:2011", Name: "Novosibirsk", Number: 7, Distance: 20},
        { Date: "10:03:2011", Name: "Tomsk", Number: 12, Distance: 39},
        { Date: "15:01:2011", Name: "Tula", Number: 13, Distance: 45},
        { Date: "15:06:2011", Name: "Kursk", Number: 20, Distance: 2},
        { Date: "16:04:2011", Name: "PifPaf", Number: 16, Distance: 33},
        { Date: "13:03:2011", Name: "Luga", Number: 13, Distance: 56},
        { Date: "16:12:2011", Name: "Yakutsks", Number: 0, Distance: 12}, /*TEST*/
      ], 
      filterText: '',
      itemsPerPage: 5,
      page: 1,
    }
  },
  methods: {
    prevPage() {
      this.page -= 1;
    },
    nextPage() {
      this.page += 1;
    },
    onSelectPage(page) {
      this.page = page;
    },
    sort() {

      const sortingField = this.sortingField;
      const sortingOrder = this.sortingOrder;
      const type =  typeof this.ratingsInfo[0][sortingField];
      console.log(sortingField, sortingOrder, type)
      this.page = 1;

      if (type === "string") {
        if (sortingOrder === "ascending") {
          this.ratingsInfo.sort((a, b) => a[sortingField] < b[sortingField] ? -1 : 1)
        } else {
          this.ratingsInfo.sort((a, b) => a[sortingField] < b[sortingField] ? 1 : -1)
        }
      } else {
        if (sortingOrder === "ascending") {
          this.ratingsInfo.sort((a, b) => a[sortingField] - b[sortingField])
        } else {
          this.ratingsInfo.sort((a, b) => b[sortingField] - a[sortingField])
        }
      }
      
    }
  },
  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  computed: {
    filteredFilms() {
      let filter = new RegExp(this.filterText, 'i');
      const filteringField = this.filteringField;
      const type = typeof this.ratingsInfo[0][filteringField];

      return type === "string" ?  this.ratingsInfo.filter(el => el[this.filteringField].match(filter)) : this.ratingsInfo.filter(el => el[filteringField] === Number(this.filterText))
    },
    slicedFilteredFilms() {
      return this.filteredFilms.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
    },
    numOfButtons() {
      return Math.ceil(this.filteredFilms.length / this.itemsPerPage)
    },
    isPrevDisabled() {
      return this.page === 1 ? true : false
    },
    isNextDisabled() {
      return this.page === this.numOfButtons ? true : false
    },
  },
  watch: {
    filterText() {
      this.page = 1
    }
  },
  created: async function() {
   try {
    const response = await axios.get("http://localhost:3000");
    const data = response.data.map(item => {
      item.Date = item.Date.slice(0,10)
      return item
    })
    console.log(data)
    console.log(typeof data[0].Date)
    this.ratingsInfo = data;
    } catch(err) {
      console.log(err)
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


button, select {
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

.buttons {
  margin-top: 10px
}

.sortings {
  display: flex;
  align-items: center;
  flex-wrap: wrap
}

label {
  margin-right: 10px
}

.sortings * {
  margin: 5px 3px
}

.sortings label {
  font-weight: bold
}

#sort {
  width: 100%
}
</style>
