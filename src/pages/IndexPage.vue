<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="form">
    <div>
      <q-input v-model="formData.inputText" type="textarea" label="Input Text" :hint="`${lines.length} lines`"
        :rules="[v => !!v || 'required']" />
      <q-select v-model="formData.separator" :options="separatorList" label="Separator" new-value-mode="add-unique"
        use-input clearable option-value="value"
        :option-label="item => item?.label ? `${item.label} (${item.value})` : item" emit-value map-options
        :hint="`${linesWithColumns[0]?.length} columns`" />
      <q-select v-model="formData.deck" :options="deckList" label="Deck" option-value="id" option-label="name"
        emit-value map-options :rules="[v => !!v || 'required']" />
      <q-select v-model="formData.notetype" :options="notetypeList" label="Notetype" option-label="name" emit-value
        map-options @update:model-value="onNotetypeChange" :rules="[v => !!v || 'required']" />
      <fieldset v-if="formData.notetype" :key="formData?.notetype?.id">
        <legend>Fields</legend>
        <q-input v-for="{ name } in formData.notetype.flds" :key="name" v-model="formData.fields[name]" type="textarea"
          autogrow :label="name" :hint="convertField(0, formData.fields[name])">
          <template #before>
            <q-btn icon="auto_fix_high" flat>
              <q-menu>
                <q-list>
                  <q-item clickable v-close-popup v-for="item in quickFieldListFull" :key="item.value"
                    @click="formData.fields[name] = (formData.fields[name] ? formData.fields[name] + ' ' : '') + item.value">
                    <q-item-section>
                      <q-item-label>{{ item.label }}</q-item-label>
                      <q-item-label>{{ convertField(0, item.value) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>
        </q-input>
      </fieldset>
    </div>
    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { quickFieldList, separatorList } from 'src/data';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { set, template } from 'lodash-es'
import { useQuasar } from 'quasar';
const $q = useQuasar()
const formData = ref()

const form = ref()
const deckList = ref<unknown[]>([])
const notetypeList = ref<unknown[]>([])
onReset()

onMounted(() => {
  pycmd('getDecks', res => deckList.value = res as unknown[])
  pycmd('getNotetypes', res => notetypeList.value = res as unknown[])
  window.addEventListener('onNotesCreated', onNotesCreated as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('onNotesCreated', onNotesCreated as EventListener)
})

function onNotesCreated(e: CustomEvent) {
  $q.loading.hide()
  const ids = e?.detail as string[]
  if (!Array.isArray(ids)) {
    $q.dialog({
      title: 'Error',
      message: String(ids),
    })
    return
  }
  const errorIndex = ids.reduce((arr: number[], id, index) => {
    if (!+id) {
      arr.push(index + 1)
    }
    return arr
  }, [])

  let message = `
  <p class="text-green">Success: ${ids.length - errorIndex.length}/${ids.length}</p>
`
  if (errorIndex.length) {
    message += `<p class="text-red">Error Lines: ${errorIndex.join(', ')}</p>`
  }
  $q.dialog({
    title: 'Result',
    message,
    html: true
  })
}

const lines = computed<string[]>(() => {
  return (formData.value?.inputText as string || '')
    .split('\n')
    .filter(line => line.trim())
})
const linesWithColumns = computed(() => {
  const separator = formData.value.separator;
  return lines.value.map(line => {
    if (!separator) {
      return [line]
    }
    return line.split(separator)
  })
})


const quickFieldListFull = computed(() => {
  const columns = linesWithColumns.value[0]?.map((_v, i) => ({
    label: `Column ${i + 1}`,
    value: `\${line[${i}]}`,
  }))
  return columns?.concat(quickFieldList)
})

function convertField(row = 0, input: string) {
  try {
    const compiled = template(input?.replace(/\n/g, '<br>'), {
      imports: {
        lines: linesWithColumns.value,
        line: linesWithColumns.value[row]
      }
    })
    return compiled({ row })
  } catch (error) {
    return String(error)
  }
}

function onSubmit() {
  form.value.validate()
  const { deck, notetype } = formData.value
  const data = {
    deckId: deck,
    notetypeId: notetype.id
  }
  const notes = lines.value.map((_, index) => {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData.value.fields)) {
      fields[key] = convertField(index, formData.value.fields[key])
    }
    return fields
  })
  $q.loading.show()
  set(window, '_data', {
    ...data,
    notes
  })
  pycmd('save')
}
function onReset() {
  form.value?.resetValidation()
  formData.value = {
    fields: {}
  }
}
function onNotetypeChange() {
  formData.value.fields = {}
}
</script>
