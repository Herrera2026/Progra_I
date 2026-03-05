// DATOS DE PRUEBA
if (localStorage.getItem(DB_PREFIX + 'autor') === null) {
    const autoresIniciales = [
        { idAutor: 1, codigo: 'AUT-001', nombre: 'Gabriel García Márquez', pais: 'Colombia', telefono: '+57 12345678' },
        { idAutor: 2, codigo: 'AUT-002', nombre: 'Isabel Allende', pais: 'Chile', telefono: '+56 87654321' },
        { idAutor: 3, codigo: 'AUT-003', nombre: 'Mario Vargas Llosa', pais: 'Perú', telefono: '+51 45678912' },
        { idAutor: 4, codigo: 'AUT-004', nombre: 'Jorge Luis Borges', pais: 'Argentina', telefono: '+54 78912345' },
        { idAutor: 5, codigo: 'AUT-005', nombre: 'Julio Cortázar', pais: 'Argentina', telefono: '+54 32165498' }
    ];
    localStorage.setItem(DB_PREFIX + 'autor', JSON.stringify(autoresIniciales));
}

if (localStorage.getItem(DB_PREFIX + 'libros') === null) {
    const librosIniciales = [
        { idLibro: 1, idAutor: 1, isbn: '978-84-376-0494-7', titulo: 'Cien años de soledad', editorial: 'Sudamericana', edicion: '1ra Edición' },
        { idLibro: 2, idAutor: 1, isbn: '978-84-397-0001-2', titulo: 'El amor en los tiempos del cólera', editorial: 'Sudamericana', edicion: '2da Edición' },
        { idLibro: 3, idAutor: 2, isbn: '978-84-9759-229-5', titulo: 'La casa de los espíritus', editorial: 'Plaza & Janés', edicion: '1ra Edición' },
        { idLibro: 4, idAutor: 2, isbn: '978-84-9759-230-1', titulo: 'Eva Luna', editorial: 'Plaza & Janés', edicion: '3ra Edición' },
        { idLibro: 5, idAutor: 3, isbn: '978-84-204-8302-5', titulo: 'La ciudad y los perros', editorial: 'Seix Barral', edicion: '1ra Edición' }
    ];
    localStorage.setItem(DB_PREFIX + 'libros', JSON.stringify(librosIniciales));
}

// Helper para localStorage
const db = {
    _leer(tabla) {
        return JSON.parse(localStorage.getItem(DB_PREFIX + tabla) || '[]');
    },
    _guardar(tabla, data) {
        localStorage.setItem(DB_PREFIX + tabla, JSON.stringify(data));
    },
    _pk(tabla) {
        return tabla === 'autor' ? 'idAutor' : 'idLibro';
    },
    table(tabla) {
        const self = this;
        return {
            toArray() {
                return Promise.resolve(self._leer(tabla));
            },
            add(registro) {
                const lista = self._leer(tabla);
                const pk = self._pk(tabla);
                const ids = lista.map(r => r[pk] || 0);
                registro[pk] = ids.length ? Math.max(...ids) + 1 : 1;
                lista.push(registro);
                self._guardar(tabla, lista);
                return Promise.resolve(registro[pk]);
            },
            update(id, cambios) {
                const lista = self._leer(tabla);
                const pk = self._pk(tabla);
                const idx = lista.findIndex(r => r[pk] === id);
                if (idx !== -1) {
                    lista[idx] = { ...lista[idx], ...cambios };
                }
                self._guardar(tabla, lista);
                return Promise.resolve();
            },
            delete(id) {
                const pk = self._pk(tabla);
                const lista = self._leer(tabla).filter(r => r[pk] !== id);
                self._guardar(tabla, lista);
                return Promise.resolve();
            }
        };
    }
};
