<template>
    <div class="alert alert-danger" role="alert">
        {{ alert }}
    </div>
</template>
<script>
export default {
    name: 'alert',
    props: {
        alert: {
            type: String,
            default: ''
        }
    }
};
</script>