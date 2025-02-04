import { defineStore } from 'pinia'
import {ref, computed} from 'vue' 
import { uid } from 'quasar'


export const userStoreEntries = defineStore('entries', ()=>{


    /*
    state
    */
    const entries = ref([
        {id:'id1',
          'name':'Ram',
          'amount':50
        },
        {id:'id2',
          'name':'Shyam',
          'amount':120
        },
        {
          id:'id3',
          'name':'Madhu marks',
          'amount':-10
        },
        {
          id:'id4',
          'name':'Raju',
          'amount':100
        },
      
      ])

    /*
        getters
    */
    const balance = computed(()=>{
      let balance = 0 
      entries.value.forEach(entry=>{
        balance = balance + entry.amount
      })
      return balance
    })
  /*          
  actions
  */
  const addEntry = addEntryFrom => { 
    const newEntry = Object.assign({}, addEntryFrom, {id : uid()})
    console.log(newEntry)
    if (newEntry.name=='') return
    else entries.value.push(newEntry)

  }

            /*
                return
            */
    return {entries, balance, addEntry}

    

})