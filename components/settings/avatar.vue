<template>
  <div
    class="h-[300px] w-[300px] rounded-lg flex flex-col items-center justify-between p-2.5 gap-1 bg-base-200 shadow-[4px_4px_30px__rgba(0,0,0,0.2)]"
  >
    <label
      for="file"
      v-if="!imgSrc"
      class="flex items-center justify-center flex-col rounded-lg border-2 border-dashed border-primary flex-1 w-full cursor-pointer"
    >
      <i class="bx bx-cloud-download bx-md"></i>
      <p>Browse File to upload!</p>
    </label>
    <div class="rounded-lg border-2 border-dashed border-primary" v-else-if="!loading">
      <ClientOnly>
        <Cropper
          v-if="imgSrc"
          ref="cropperRef"
          class="cropper"
          :src="imgSrc"
          :stencil-props="{ aspectRatio: 1 }"
          :defaultSize="{ width: 276, height: 232 }"
          :autoZoom="true"
        />
      </ClientOnly>
    </div>
    <div
      v-else="loading"
      class="flex items-center justify-center flex-col rounded-lg border-2 border-dashed border-primary flex-1 w-full cursor-pointer"
    >
      <span class="loading loading-bars loading-lg"></span>
    </div>
    <div class="flex h-10 w-full items-center justify-end rounded-[10px] p-2">
      <i
        v-if="imgSrc && !loading"
        @click="cropImage"
        class="bx bx-sm bx-check cursor-pointer rounded-full p-2 hover:bg-base-300"
      ></i>
      <i
        v-else-if="!imgSrc && !loading"
        @click="
          () => {
            if (avatarRef) avatarRef.click()
          }
        "
        class="bx bx-sm bxs-file-image cursor-pointer rounded-full p-2 hover:bg-base-300"
      ></i>
      <i v-else class="bx bx-sm bxs-happy-beaming rounded-full p-2 hover:bg-base-300"></i>
      <p class="flex-1 text-center text-base-content" v-if="avatar.file">{{ avatar.file.name }}</p>
      <p class="flex-1 text-center text-base-content" v-else>Not selected file</p>
      <i @click="remove()" class="bx bx-sm bx-trash-alt cursor-pointer rounded-full p-2 hover:bg-base-300"></i>
    </div>
    <input id="file" ref="avatarRef" class="hidden" type="file" accept="image/*" @change="avatarChanged" />
  </div>
</template>

<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.compact.css'

const emit = defineEmits(['toggle'])
const { setToast } = useToast()

const { updateAvatar } = useStorage()

const loading = ref(false)

const avatar = reactive({ file: <File | null>null })
const imgSrc = ref('')

const avatarRef = ref(<HTMLInputElement | null>null)
const cropperRef = ref()

const remove = (fullRemove = true) => {
  if (!avatarRef.value) return
  avatarRef.value.value = ''
  if (fullRemove) {
    imgSrc.value = ''
    avatar.file = null
  }
}

const cropImage = async () => {
  loading.value = true
  const { canvas } = cropperRef.value.getResult()
  if (canvas) {
    const error = await toBlob(canvas)
    if (error) {
      setToast('error', 'Oops, there was an error, try again later.')
      remove()
      loading.value = false
      return
    }
    remove()
    emit('toggle')
    setToast('success', 'Your avatar has been successfully replaced')
  } else {
    setToast('error', 'Oops, there was an error, try again later.')
    remove()
    loading.value = false
  }
}

const toBlob = async (canvas: HTMLCanvasElement) => {
  const formData = new FormData()

  await new Promise<void>((resolve) => {
    canvas.toBlob((blob: Blob | null) => {
      if (!blob) return

      const file = new File([blob], 'temp.png', { type: 'image/png' })
      formData.append('file', file)

      resolve()
    }, 'image/png')
  })

  if (!formData.has('file')) return true

  const error = !(await updateAvatar(formData))

  return error
}

const avatarChanged = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file: File = (target.files as FileList)[0]

  if (file.type.indexOf('image/') === -1) {
    setToast('error', 'Please select an image file')
    return
  }

  if (typeof FileReader === 'function') {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') imgSrc.value = event.target.result
    }
    reader.readAsDataURL(file)
    avatar.file = file
  } else {
    setToast('error', 'FileReader API not supported')
  }
}
</script>

<style scoped>
.cropper {
  height: 232px;
  width: 276px;
  background: #ddd;
}
</style>
