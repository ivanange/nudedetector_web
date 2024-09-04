<template>
    <div class="container h-full max-w-screen-xl mx-auto px-4 py-16 flex items-center justify-center flex-col">
        <h1 class="text-2xl font-bold mb-10">
            Nude Detector
        </h1>
        <div class="min-w-96 w-full max-w-screen-sm">
            <file-selector v-model="files" :accept="['image/png', 'image/jpeg']">
                <dropzone v-slot="{ hovered }">
                    <div class="w-full min-h-64 rounded-lg border-4 border-dashed border-gray-400 transition-colors duration-150 flex flex-col py-10 px-5 justify-center items-center"
                        :class="{ 'border-blue-200': hovered }">
                        <div class="flex flex-wrap">
                            <img v-for="(preview, i) in previews" :key="preview" :src="preview" :title="files[i].name"
                                class="h-64 w-64 mx-5 my-5 object-contain object-center border-[7px] rounded-md"
                                :class="validation[files[i].name] !== undefined ? (validation[files[i].name] ? 'border-green-600' : 'border-red-600') : ''" />
                        </div>
                        <div class="mt-16 flex">
                            <dialog-button
                                class="flex mx-4 text-gray-600 bg-gray-300 border transition-colors duration-300 py-2 px-8 focus:outline-none hover:bg-gray-400 rounded text-lg">
                                Add images
                            </dialog-button>
                            <button @click="files = []"
                                class="flex mx-4 text-white bg-red-500 border transition-colors duration-300 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                                Clear
                            </button>
                        </div>
                    </div>
                </dropzone>
            </file-selector>
            <button @click="validate"
                class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Validate
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios, { type AxiosProgressEvent } from 'axios';
import { FileSelector, Dropzone, DialogButton } from 'vue3-file-selector'

const progress = ref(0);
const error = ref('');
const files = ref<File[]>([])
const toBlob = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const blob = new Blob([buffer])
    const srcBlob = URL.createObjectURL(blob)

    return srcBlob
}
const previews = ref<string[]>([]);
watchEffect(async () => previews.value = await Promise.all(files.value.map((file) => toBlob(file))))
const validation = ref<{ [key: string]: boolean }>({});

function validate() {
    progress.value = 0
    let formData = new FormData();
    files.value.forEach((file) => formData.append('file', file));
    const config = {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 100)
            )
            progress.value = percentCompleted
        }
    }
    axios.post(
        'http://38.242.135.225:4000/validate',
        formData,
        config
    )
        .then((data) => {
            console.log(data);
            validation.value = ((data.data as Array<{ filename: string; valid: number }>)
                .reduce((acc, res) => {
                    acc[res.filename] = res.valid > 0;
                    return acc
                }, {} as { [key: string]: boolean }))
            console.log(validation)
        })
        .catch((err) => error.value = 'Error has occured')
}
</script>
<style></style>
