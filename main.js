const { createApp } = Vue;

const app = createApp({
    components: {
        autor,
        buscar_autor,
        libros,
        buscar_libros
    },
    
    data() {
        return {
            ventanaActiva: 'autor', // Mostrar autor por defecto
            forms: {
                autor: { mostrar: false },
                buscar_autor: { mostrar: false },
                libros: { mostrar: false },
                buscar_libros: { mostrar: false }
            }
        };
    },
    
    mounted() {
        // Inicializar mostrando la ventana de autor
        this.abrirVentana('autor');
    },
    
    methods: {
        abrirVentana(ventana) {
            console.log('Abriendo ventana:', ventana);
            this.ventanaActiva = ventana;
            
            // Actualizar forms para los watchers
            Object.keys(this.forms).forEach(key => {
                this.forms[key].mostrar = (key === ventana);
            });
            
            // Cargar datos según la ventana
            this.$nextTick(() => {
                const ref = this.$refs[ventana];
                if (!ref) {
                    console.log('No hay referencia para:', ventana);
                    return;
                }
                
                console.log('Referencia encontrada:', ventana, ref);
                
                switch(ventana) {
                    case 'autor':
                        if (ref.cargarLista) {
                            ref.cargarLista();
                            ref.limpiar();
                        }
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
                if (this.$refs.autor && this.$refs.autor.modificarAutor) {
                    this.$refs.autor.modificarAutor(data);
                }
            });
        },

        editarLibro(data) {
            this.abrirVentana('libros');
            this.$nextTick(() => {
                if (this.$refs.libros && this.$refs.libros.modificarLibro) {
                    this.$refs.libros.modificarLibro(data);
                }
            });
        }
    }
});

app.mount('#app');
