<template>
  <div class="category-admin">
      <b-form>
        <input id="category-id" type="hidden" v-model="category.id" />

            <b-form-group label="Nome:" label-for= "category-name">
                <b-form-input id= "category-name" type="text"
                      v-model= "category.name" required
                      :readonly="mode === 'remove'" placeholder="Digite o nome da categoria"/>
            </b-form-group>
    
        
       
              <b-form-group label="Categoria Pai:" label-for= "category-parentId">
                  <b-form-select v-if="mode === 'save'" 
                  id="category-parentId" :options="categories" 
                  v-model="category.parentId" />
                   <b-form-input  v-else
                    id="category-parentId" type="text" 
                    v-model="category.path"
                    readonly />
              </b-form-group>
     
       


            <b-button variant='primary'
             v-if="mode === 'save'" @click="save"> Salvar </b-button>
            <b-button variant='danger' 
            v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class= 'ml-2' @click="reset">Cancelar</b-button>
      
      </b-form>
      
      <hr>

      <b-table houver striped :items="categories" :fields="fields">
         <template slot="actions" slot-scope="data">
           <b-button variant="warning" @click="loadCategory(data.item)" 
           class="mr-2">
             <i class="fa fa-pencil"/>
           </b-button>
           <b-button variant="danger" 
           @click="loadCategory(data.item,'remove')">
             <i class="fa fa-trash"/>
           </b-button>
        </template>
      </b-table>
  </div>
</template>

<script>

import {baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
    name:'CategoryAdmin',
    data: function(){
      return{
        mode: 'save',
        category: {},
        categories: [],
        fields:[
          {key: 'id', label:'Codigo', sortable: true},
          {key: 'name', label: 'Nome', sortable: true},
          {key:'path', label:'Caminho', sortable:true},
          {key: 'actions', label:'Ações'}
        ]
      }
    },
    methods:{
      loadCategories(){
        const url = `${baseApiUrl}/categories`
        axios.get(url).then(res => {
          this.categories = res.data.map(category =>{
            return {...category, 
            value: category.id, text:category.path}
          })
          })
      },
      reset(){
        this.mode ='save'
        this.category = {}
        this.loadCategories()
      },
      save(){
        const method = this.category.id ? 'put' : 'post'
        const id = this.category.id ?  `/${this.category.id}`: ''
        const url = `${baseApiUrl}/categories${id}`
        axios[method](url, this.category).then(()=>{
          this.$toasted.global.defaultSuccess()
          this.reset()
        }).catch(showError)
      },
      remove(){
        const id = this.category.id;
        const url = `${baseApiUrl}/categories/${id}`
        axios.delete(url).then(()=>{
           this.$toasted.global.defaultSuccess()
           this.reset()
        }).catch(showError)
      },
      loadCategory(category, mode = 'save') {
            this.mode = mode
            this.category = { ...category }
      }
    },
     mounted(){
        this.loadCategories()
    }
}
</script>

<style>

</style>