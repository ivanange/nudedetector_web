<template>
    <div class="container h-full max-w-screen-xl mx-auto px-4 py-16 flex items-center justify-center flex-col">
        <h1 class="text-4xl font-bold mb-10">
            Nude Detector
        </h1>
        <div class="min-w-96 w-full max-w-screen-sm">
            <file-selector ref="fselect" v-model="files" :accept="['image/png', 'image/jpeg']">
                <dropzone v-slot="{ hovered }">
                    <div class="w-full min-h-32 rounded-lg border-4 border-dashed border-gray-400 transition-colors duration-150 flex flex-col py-10 px-5 justify-center items-center"
                        :class="{ 'border-blue-200': hovered }">
                        <div v-if="files.length > 0 && previews.length > 0" class="flex flex-wrap mb-16">
                            <img v-for="(preview, i) in previews" :key="preview" :src="preview" :title="files[i].name"
                                class="h-64 w-64 mx-5 my-5 object-contain object-center border-[7px] rounded-md"
                                :class="validation[files[i].name] !== undefined ? (validation[files[i].name] ? 'border-green-600' : 'border-red-600') : ''" />
                        </div>
                        <div class="flex">
                            <dialog-button
                                class="flex mx-4 text-gray-600 bg-gray-300 border transition-colors duration-300 py-2 px-8 focus:outline-none hover:bg-gray-400 rounded text-lg">
                                Add images
                            </dialog-button>
                            <button @click="files = []; fselect.$refs.inputRef.value = ''"
                                class="flex mx-4 text-white bg-red-500 border transition-colors duration-300 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                                Clear
                            </button>
                        </div>
                    </div>
                </dropzone>
            </file-selector>
            <button @click="validate" :disabled="progress > 0"
                class="flex items-center mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                <svg v-show="progress > 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6 mr-2 animate-spin">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>

                Validate
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios, { type AxiosProgressEvent } from 'axios';
import { FileSelector, Dropzone, DialogButton } from 'vue3-file-selector'

const fselect = ref(null)
const progress = ref(0);
const error = ref('');
const files = ref<File[]>([]);
const toBlob = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer]);
    const srcBlob = URL.createObjectURL(blob);
    return srcBlob;
}
const previews = ref<string[]>([]);
watchEffect(async () => previews.value = await Promise.all(files.value.map((file) => toBlob(file))));
const validation = ref<{ [key: string]: boolean }>({});

function validate() {
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
        'https://nudeapi.ivanange.dev/validate',
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
        .finally(() => progress.value = 0)
}
</script>
<style></style>
