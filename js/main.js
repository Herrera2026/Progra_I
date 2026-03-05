const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            ventanaActiva: 'autor',
            forms: {
                autor:         { mostrar: false },
                buscar_autor:  { mostrar: false },
                libros:        { mostrar: false },
                buscar_libros: { mostrar: false }
            }
        };
    },

    mounted() {
        this.abrirVentana('autor');
    },

    methods: {
        abrirVentana(ventana) {
            this.ventanaActiva = ventana;
            Object.keys(this.forms).forEach(k => {
                this.forms[k].mostrar = (k === ventana);
            });

            this.$nextTick(() => {
                const ref = this.$refs[ventana];
                if (!ref) return;

                switch (ventana) {
                    case 'autor':
                        if (ref.cargarLista) { ref.cargarLista(); ref.limpiar(); }
                        break;
                    case 'buscar_autor':
                        if (ref.obtenerAutores) ref.obtenerAutores();
                        break;
                    case 'libros':
                        if (ref.cargarAutores) {
                            ref.cargarAutores().then(() => {
                                if (ref.cargarLista) ref.cargarLista();
                            });
                        }
                        break;
                    case 'buscar_libros':
                        if (ref.obtenerLibros) ref.obtenerLibros();
                        break;
                }
            });
        },

        editarAutor(data) {
            this.abrirVentana('autor');
            this.$nextTick(() => {
                if (this.$refs.autor?.modificarAutor)
                    this.$refs.autor.modificarAutor(data);
            });
        },

        editarLibro(data) {
            this.abrirVentana('libros');
            this.$nextTick(() => {
                if (this.$refs.libros?.modificarLibro)
                    this.$refs.libros.modificarLibro(data);
            });
        }
    }
});

// Registrar componentes globales
app.component('autor',         window.Autor);
app.component('buscar_autor',  window.BuscarAutor);
app.component('libros',        window.Libros);
app.component('buscar_libros', window.BuscarLibros);

app.mount('#app');
