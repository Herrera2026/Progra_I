const libros = {
    template: `
    <div class="container-fluid py-4">
      <!-- HEADER -->
      <div class="d-flex align-items-center gap-3 mb-4">
        <div style="width:56px;height:56px;border-radius:16px;
             background:linear-gradient(135deg,#0ea5e9,#2563eb);
             display:flex;align-items:center;justify-content:center;
             box-shadow:0 10px 20px rgba(14,165,233,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
          </svg>
        </div>
        <div>
          <h2 class="mb-0 fw-bold" style="color:#1e3a5f">Gestión de Libros</h2>
          <p class="mb-0" style="color:#6b7280">Registre y administre el catálogo de libros</p>
        </div>
      </div>

      <!-- FORMULARIO -->
      <div class="card border-0 shadow-lg mb-4" style="border-radius:1.5rem;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0ea5e9,#2563eb);padding:1rem 1.5rem;">
          <h5 class="mb-0 text-white fw-semibold">
            <span v-if="!form.idLibro">➕ NUEVO LIBRO</span>
            <span v-else>✏️ MODIFICAR LIBRO</span>
          </h5>
        </div>
        <div class="card-body p-4" style="background:#f8fcff;">
          <div class="row g-4">
            <!-- ISBN -->
            <div class="col-md-2">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">
                ISBN <span class="text-danger">*</span>
              </label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">📘</span>
                <input type="text" class="form-control border-start-0 ps-1 shadow-none"
                  :class="{'is-invalid border-danger': errores.isbn}"
                  v-model.trim="form.isbn"
                  placeholder="978-0-00-000"
                  style="background:white;font-size:.95rem;" />
                <div class="invalid-feedback">{{ errores.isbn }}</div>
              </div>
            </div>

            <!-- Título -->
            <div class="col-md-4">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">
                TÍTULO <span class="text-danger">*</span>
              </label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">📖</span>
                <input type="text" class="form-control border-start-0 ps-1 shadow-none"
                  :class="{'is-invalid border-danger': errores.titulo}"
                  v-model.trim="form.titulo"
                  placeholder="Título del libro"
                  style="background:white;font-size:.95rem;" />
                <div class="invalid-feedback">{{ errores.titulo }}</div>
              </div>
            </div>

            <!-- Autor -->
            <div class="col-md-3">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">
                AUTOR <span class="text-danger">*</span>
              </label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">👤</span>
                <select class="form-select border-start-0 shadow-none"
                  :class="{'is-invalid border-danger': errores.idAutor}"
                  v-model="form.idAutor"
                  style="background:white;font-size:.95rem;">
                  <option value="">— Seleccione un autor —</option>
                  <option v-for="a in autores" :key="a.idAutor" :value="a.idAutor">
                    {{ a.nombre }}
                  </option>
                </select>
                <div class="invalid-feedback">{{ errores.idAutor }}</div>
              </div>
            </div>

            <!-- Editorial -->
            <div class="col-md-2">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">EDITORIAL</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">🏢</span>
                <input type="text" class="form-control border-start-0 ps-1 shadow-none"
                  v-model.trim="form.editorial"
                  placeholder="Editorial"
                  style="background:white;font-size:.95rem;" />
              </div>
            </div>

            <!-- Edición -->
            <div class="col-md-1">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">EDICIÓN</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">🔢</span>
                <input type="text" class="form-control border-start-0 ps-1 shadow-none"
                  v-model.trim="form.edicion"
                  placeholder="1ra"
                  style="background:white;font-size:.95rem;" />
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12 d-flex justify-content-end gap-2">
              <button class="btn px-4 py-2 fw-semibold text-white shadow-sm"
                style="background:linear-gradient(135deg,#0ea5e9,#2563eb);
                       border:none;border-radius:12px;font-size:.95rem;"
                @click="guardar">
                <span v-if="!form.idLibro">💾 Guardar Libro</span>
                <span v-else>✏️ Actualizar Libro</span>
              </button>
              <button class="btn btn-outline-secondary px-4 py-2"
                style="border-radius:12px;font-size:.95rem;" 
                @click="limpiar">
                🔄 Nuevo
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLA DE REGISTROS -->
      <div class="card border-0 shadow-lg" style="border-radius:1.5rem;overflow:hidden;">
        <!-- Barra de búsqueda -->
        <div style="background:linear-gradient(135deg,#0c1a2e,#1e3a5f);padding:1.2rem 1.5rem;">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="text-white fw-bold mb-0">
              <span style="margin-right:10px;">📋</span> LISTADO DE LIBROS
            </h5>
            <div class="d-flex gap-3">
              <span class="badge" style="background:rgba(255,255,255,.15);padding:8px 16px;">
                Total: <strong class="text-white ms-1">{{ lista.length }}</strong>
              </span>
              <span class="badge" style="background:rgba(255,255,255,.15);padding:8px 16px;">
                Filtrados: <strong class="text-white ms-1">{{ listaFiltrada.length }}</strong>
              </span>
            </div>
          </div>
          
          <!-- Filtros de búsqueda (3 campos) -->
          <div class="row g-3">
            <div class="col-md-3">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">📘</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.isbn" @input="filtrar"
                  placeholder="Buscar por ISBN...">
              </div>
            </div>
            <div class="col-md-3">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">📖</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.titulo" @input="filtrar"
                  placeholder="Buscar por título...">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">👤</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.autor" @input="filtrar"
                  placeholder="Buscar autor...">
              </div>
            </div>
            <div class="col-md-2">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">🏢</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.editorial" @input="filtrar"
                  placeholder="Buscar editorial...">
              </div>
            </div>
            <div class="col-md-2">
              <button @click="limpiarBusqueda" class="btn btn-light w-100">🔄 Limpiar</button>
            </div>
          </div>
        </div>

        <!-- Tabla -->
        <div style="overflow-x:auto;max-height:500px;overflow-y:auto;">
          <table class="table table-hover mb-0" style="min-width:900px;">
            <thead style="position:sticky;top:0;z-index:2;background:#e8f0fe;">
              <tr>
                <th style="padding:15px 16px;">#</th>
                <th style="padding:15px 16px;">ISBN</th>
                <th style="padding:15px 16px;">TÍTULO</th>
                <th style="padding:15px 16px;">AUTOR</th>
                <th style="padding:15px 16px;">EDITORIAL</th>
                <th style="padding:15px 16px;">EDICIÓN</th>
                <th style="padding:15px 16px;text-align:center;">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(l, i) in listaFiltrada" :key="l.idLibro"
                :class="{ 'table-info': form.idLibro === l.idLibro }">
                <td style="padding:12px 16px;">{{ i + 1 }}</td>
                <td style="padding:12px 16px;">
                  <span class="badge" style="background:#dbeafe;color:#1d4ed8;padding:6px 12px;">
                    {{ l.isbn }}
                  </span>
                </td>
                <td style="padding:12px 16px;font-weight:600;">{{ l.titulo }}</td>
                <td style="padding:12px 16px;">
                  <span class="badge" style="background:#ede9fe;color:#5b21b6;padding:6px 12px;">
                    {{ nombreAutor(l.idAutor) }}
                  </span>
                </td>
                <td style="padding:12px 16px;">{{ l.editorial || '—' }}</td>
                <td style="padding:12px 16px;">{{ l.edicion || '—' }}</td>
                <td style="padding:12px 16px;text-align:center;">
                  <button @click="cargarEdicion(l)" class="btn btn-sm btn-primary me-2 btn-action"
                    style="background:linear-gradient(135deg,#0ea5e9,#2563eb);border:none;">
                    ✏️ Editar
                  </button>
                  <button @click="eliminar(l.idLibro)" class="btn btn-sm btn-danger btn-action"
                    style="background:linear-gradient(135deg,#ef4444,#dc2626);border:none;">
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
              <tr v-if="listaFiltrada.length === 0">
                <td colspan="7" style="text-align:center;padding:60px 20px;">
                  <div style="font-size:3.5rem;margin-bottom:15px;">📚</div>
                  <h5 style="color:#9ca3af;">No se encontraron libros</h5>
                  <p style="color:#d1d5db;">Registre un nuevo libro o cambie los filtros de búsqueda</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`,

    data() {
        return {
            lista: [],
            autores: [],
            listaFiltrada: [],
            form: { idLibro: null, idAutor: '', isbn: '', titulo: '', editorial: '', edicion: '' },
            errores: { isbn: '', titulo: '', idAutor: '' },
            busqueda: { isbn: '', titulo: '', autor: '', editorial: '' } // 4 campos de búsqueda
        };
    },

    async mounted() {
        await this.cargarAutores();
        await this.cargarLista();
    },

    methods: {
        async cargarAutores() {
            this.autores = await db.table('autor').toArray();
        },
        
        async cargarLista() {
            this.lista = await db.table('libros').toArray();
            this.filtrar();
        },
        
        filtrar() {
            const i = this.busqueda.isbn.toLowerCase();
            const t = this.busqueda.titulo.toLowerCase();
            const a = this.busqueda.autor.toLowerCase();
            const e = this.busqueda.editorial.toLowerCase();
            
            this.listaFiltrada = this.lista.filter(l => {
                const nomAutor = this.nombreAutor(l.idAutor).toLowerCase();
                return (l.isbn || '').toLowerCase().includes(i) &&
                       (l.titulo || '').toLowerCase().includes(t) &&
                       nomAutor.includes(a) &&
                       (l.editorial || '').toLowerCase().includes(e);
            });
        },
        
        limpiarBusqueda() {
            this.busqueda = { isbn: '', titulo: '', autor: '', editorial: '' };
            this.filtrar();
        },
        
        nombreAutor(idAutor) {
            const a = this.autores.find(x => x.idAutor === idAutor);
            return a ? a.nombre : '—';
        },
        
        validar() {
            this.errores = { isbn: '', titulo: '', idAutor: '' };
            let ok = true;
            if (!this.form.isbn) { 
                this.errores.isbn = 'El ISBN es obligatorio'; 
                ok = false; 
            }
            if (!this.form.titulo) { 
                this.errores.titulo = 'El título es obligatorio'; 
                ok = false; 
            }
            if (!this.form.idAutor) { 
                this.errores.idAutor = 'Seleccione un autor'; 
                ok = false; 
            }
            return ok;
        },
        
        async guardar() {
            if (!this.validar()) return;
            
            try {
                const datos = {
                    idAutor: this.form.idAutor,
                    isbn: this.form.isbn,
                    titulo: this.form.titulo,
                    editorial: this.form.editorial,
                    edicion: this.form.edicion
                };
                
                if (this.form.idLibro) {
                    await db.table('libros').update(this.form.idLibro, datos);
                    alertify.success('✅ Libro actualizado correctamente');
                } else {
                    await db.table('libros').add(datos);
                    alertify.success('✅ Libro registrado correctamente');
                }
                
                this.limpiar();
                await this.cargarLista();
            } catch (e) {
                alertify.error('❌ Error: ' + e.message);
            }
        },
        
        cargarEdicion(l) {
            this.form = { ...l };
            this.errores = { isbn: '', titulo: '', idAutor: '' };
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        
        modificarLibro(data) {
            this.cargarEdicion(data);
        },
        
        limpiar() {
            this.form = { idLibro: null, idAutor: '', isbn: '', titulo: '', editorial: '', edicion: '' };
            this.errores = { isbn: '', titulo: '', idAutor: '' };
        },
        
        async eliminar(id) {
            alertify.confirm(
                'Confirmar eliminación',
                '¿Está seguro que desea eliminar este libro?',
                async () => {
                    await db.table('libros').delete(id);
                    alertify.success('🗑️ Libro eliminado');
                    if (this.form.idLibro === id) this.limpiar();
                    await this.cargarLista();
                },
                () => {}
            ).setHeader('⚠️ Advertencia');
        }
    }
};
window.Libros = libros;
