<template>
  <q-page >
    <div class="q-pa-md" >
    <q-list bordered seperator>
      <q-slide-item
        v-for="entry in storeEntries.entries"
        :key="entry.id"
        @left="onLeft($event, entry)"
        @right="onRight"
        >
        <template v-slot:left>
          <q-icon name="control_point" />
          </template>
          <template v-slot:right>
            <q-icon name="delete" />
          </template>

        <q-item >
          <q-item-section  :class="useAmountColour(entry.amount)">
            <q-item-label overline>OVERLINE</q-item-label>
            <q-item-label
            class="text-weight-bolder">Single line item</q-item-label>
            
            <q-item-label caption>{{ entry.name }}</q-item-label>
          </q-item-section>

          <q-item-section side 
              :class="useAmountColour(entry.amount)">
            {{ useCurrencyfy ( entry.amount) }}
            <!-- <q-item-label caption>+INR 11,343,343</q-item-label> -->
          </q-item-section>
        </q-item>

     </q-slide-item>
    </q-list>
  </div>
  <q-footer
  class="bg-transparent">
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
      <div class="col text-grey-7 text-h6">Balance</div>
      <div 
      :class="useAmountColour(storeEntries.balance)"
      class="col text-h6 text-right">{{ useCurrencyfy(storeEntries.balance)}}</div>
    </div>
    <q-form 
      @submit="addEntryFromSubmit"
      class="class row q-pa-sm q-col-gutter-sm">
      >
      <div class="class col">
        <q-input 
        v-model="addEntryForm.name"
        placeholder="Name" 
        ref="nameRef"
        bg-color="white"
        outlined/>
      </div>
      <div class="class col">
        <q-input
        v-model.number="addEntryForm.amount" 
        input-class="text-right"
        placeholder="Amount" 
        bg-color="white"
        type="number"
        step="0.05"
        outlined/></div>
      <div class="class col col-auto">
        <q-btn
        color="primary"
        icon="add"
        type="submit"
        round
        />
      </div>
    </q-form>
  </q-footer>
  </q-page>
</template>

<script setup>
// defineOptions({
//   name: 'IndexPage'
// });
import {ref, computed, reactive} from 'vue'
import { uid, useQuasar } from 'quasar'
import { userStoreEntries } from 'src/use/StateSettings'
import { useCurrencyfy } from 'src/use/useCurrencyFy'
import { useAmountColour } from 'src/use/useAmountColour'


const storeEntries = userStoreEntries()
console.log(storeEntries.entries)
const entries = ref([
  {id:'id1',
    'name':'Ram',
    'amount':100
  },
  {id:'id2',
    'name':'Shyam',
    'amount':120
  },
  {
    id:'id3',
    'name':'Madhu',
    'amount':-10
  },
  {
    id:'id4',
    'name':'Raju',
    'amount':0
  },

])

const $q = useQuasar()

const balance = computed(()=>{
  let balance = 0 
  entries.value.forEach(entry=>{
    balance = balance + entry.amount
  })
  return balance
})
const nameRef= ref(null)
const addEntryFormDefault = {
  name:'',
  amount: null
}
const addEntryForm = reactive({
  ...addEntryFormDefault
})


const addEntryFormReset = () =>{
  Object.assign(addEntryForm, addEntryFormDefault)
  nameRef.value.focus()
}

const addEntryFromSubmit = () => {
    storeEntries.addEntry(addEntryForm)
}
const addEntry = ()=>{
  // const newEntry = {
  //   id : uid(),
  //   name : addEntryForm.name,
  //   amount : addEntryForm.amount
  // }
  const newEntry = Object.assign({}, addEntryForm, {id : uid()})
  console.log(newEntry)
  if (newEntry.name=='') return
  else entries.value.push(newEntry)
  addEntryFormReset()
}

const onLeft=({reset}, entry)=>{
  console.log('OnLeft')
  $q.dialog({
        title: 'Select Entry',
        message: `
        Confirm to delete the entry?
        <div class ="q-mt-md text-weight-bold ${ useAmountColour(entry.amount)}">
          ${ entry.name} : ${ useCurrencyfy(entry.amount)}
        </div>
        `,
        cancel: true,
        persistent: true,
        html:true,
        ok: {
          label: 'Delete',
          color: 'negative',
          noCaps: true
        },
        cancle: {
          color: 'primery',
          noCaps: true
        }
      }).onOk(() => {
         console.log('>>>>>>>> OK')
         deleteEntry(entry.id)
      }).onCancel(() => {
         console.log('>>>> Cancel')
         reset()
      })
}

const onRight=()=>{
  console.log("On Right")
  $q.dialog({
        title: 'Prompt',
        message: 'What is your name?',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        // console.log('>>>> OK, received', data)
        
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
}


const deleteEntry = entryId=>{
  const index = entries.value.findIndex(entry=>entry.id === entryId)
  console.log("ID ", index)
  entries.value.splice(index, 1)
  $q.notify({
          message: 'Entry Delted ID: ${ entryId }',
          html: false,
          position: 'top-right',
          timeout: 2500,
          textColor: 'white',
          actions: [{ icon: 'deleted', color: 'blue' }]
        })
}

</script>
