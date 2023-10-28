import { useStorage } from '@vueuse/core'
import { initialEditorValue } from '@/editors/vanilla/utils/helpers'
import { StorageName } from '@/editors/vanilla/utils/types'

export const editorState = useStorage<Record<string, any>>(
  StorageName.EDITOR_STATE,
  {}
)

export const editorValue = ref(initialEditorValue)