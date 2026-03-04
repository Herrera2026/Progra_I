const { createApp } = Vue;

// ════════════════════════════════════════════════════════
//  db — emula la API de Dexie usando localStorage
//  Claves usadas:
//    db_usss033118_autor   → JSON array de autores
//    db_usss033118_libros  → JSON array de libros
// ════════════════════════════════════════════════════════
const DB_PREFIX = 'db_usss033118_';

const db = {
    _leer(tabla) {
        return JSON.parse(localStorage.getItem(DB_PREFIX + tabla) || '[]');
    },
    _guardar(tabla, data) {
        localStorage.setItem(DB_PREFIX + tabla, JSON.stringify(data));
    },
    _pk(tabla) {
        // Mapea el nombre de tabla → nombre del campo PK
        const mapa = { autor: 'idAutor', libros: 'idLibro' };
        return mapa[tabla] || ('id' + tabla.charAt(0).toUpperCase() + tabla.slice(1));
    },

    table(tabla) {
        const self = this;
        return {
            toArray() {
                return Promise.resolve(self._leer(tabla));
            },
            add(registro) {
                const lista = self._leer(tabla);
                const pk    = self._pk(tabla);
                const ids   = lista.map(r => r[pk] || 0);
                registro[pk] = ids.length ? Math.max(...ids) + 1 : 1;
                lista.push(registro);
                self._guardar(tabla, lista);
                return Promise.resolve(registro[pk]);
            },
            update(id, cambios) {
                const lista = self._leer(tabla);
                const pk    = self._pk(tabla);
                const idx   = lista.findIndex(r => r[pk] === id);
                if (idx !== -1) lista[idx] = { ...lista[idx], ...cambios };
                self._guardar(tabla, lista);
                return Promise.resolve();
            },
            delete(id) {
                const pk    = self._pk(tabla);
                const lista = self._leer(tabla).filter(r => r[pk] !== id);
                self._guardar(tabla, lista);
                return Promise.resolve();
            }
        };
    }
};
// ════════════════════════════════════════════════════════

createApp({
    components: {
        autor,
        buscar_autor,
        libros,
        buscar_libros
    },
    data() {
        return {
            forms: {
                autor:         { mostrar: false },
                buscar_autor:  { mostrar: false },
                libros:        { mostrar: false },
                buscar_libros: { mostrar: false }
            }
        };
    },
    methods: {
        buscar(ventana, metodo) {
            this.$refs[ventana][metodo]();
        },
        abrirVentana(ventana) {
            this.forms[ventana].mostrar = !this.forms[ventana].mostrar;
        },
        modificar(ventana, metodo, data) {
            this.$refs[ventana][metodo](data);
        }
    }
}).mount('#app');