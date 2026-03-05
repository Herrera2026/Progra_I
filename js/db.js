// =============================================
// BASE DE DATOS: db_USSS033118
// Motor: Dexie.js (IndexedDB wrapper)
// =============================================

const db = new Dexie('db_USSS033118');

db.version(1).stores({
    autor:  '++idAutor, codigo, nombre, pais, telefono',
    libros: '++idLibro, idAutor, isbn, titulo, editorial, edicion'
});

// ── Datos iniciales (solo si las tablas están vacías) ──
db.on('populate', () => {
    db.autor.bulkAdd([
        { codigo: 'AUT-001', nombre: 'Gabriel García Márquez', pais: 'Colombia',  telefono: '+57 12345678' },
        { codigo: 'AUT-002', nombre: 'Isabel Allende',         pais: 'Chile',     telefono: '+56 87654321' },
        { codigo: 'AUT-003', nombre: 'Mario Vargas Llosa',     pais: 'Perú',      telefono: '+51 45678912' },
        { codigo: 'AUT-004', nombre: 'Jorge Luis Borges',      pais: 'Argentina', telefono: '+54 78912345' },
        { codigo: 'AUT-005', nombre: 'Julio Cortázar',         pais: 'Argentina', telefono: '+54 32165498' }
    ]);

    db.libros.bulkAdd([
        { idAutor: 1, isbn: '978-84-376-0494-7', titulo: 'Cien años de soledad',               editorial: 'Sudamericana',  edicion: '1ra Edición' },
        { idAutor: 1, isbn: '978-84-397-0001-2', titulo: 'El amor en los tiempos del cólera',  editorial: 'Sudamericana',  edicion: '2da Edición' },
        { idAutor: 2, isbn: '978-84-9759-229-5', titulo: 'La casa de los espíritus',            editorial: 'Plaza & Janés', edicion: '1ra Edición' },
        { idAutor: 2, isbn: '978-84-9759-230-1', titulo: 'Eva Luna',                            editorial: 'Plaza & Janés', edicion: '3ra Edición' },
        { idAutor: 3, isbn: '978-84-204-8302-5', titulo: 'La ciudad y los perros',              editorial: 'Seix Barral',   edicion: '1ra Edición' }
    ]);
});
