<template>
    <div>
        <h2>{{ $_('Thank you!') }}</h2>
        <a href="#" @click="$emit('book-new-session')">{{ $_('Book new session') }}</a>
    </div>
</template>
