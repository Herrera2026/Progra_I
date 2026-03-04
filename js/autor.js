const autor = {
    template: `
    <div class="container-fluid py-4">
      <!-- HEADER -->
      <div class="d-flex align-items-center gap-3 mb-4">
        <div style="width:56px;height:56px;border-radius:16px;
             background:linear-gradient(135deg,#4f46e5,#7c3aed);
             display:flex;align-items:center;justify-content:center;
             box-shadow:0 10px 20px rgba(79,70,229,0.3);">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        </div>
        <div>
          <h2 class="mb-0 fw-bold" style="color:#1e1b4b">Gestión de Autores</h2>
          <p class="mb-0" style="color:#6b7280">Registre y administre los autores del sistema</p>
        </div>
      </div>

      <!-- FORMULARIO -->
      <div class="card border-0 shadow-lg mb-4" style="border-radius:1.5rem;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:1rem 1.5rem;">
          <h5 class="mb-0 text-white fw-semibold">
            <span v-if="!form.idAutor">➕ NUEVO AUTOR</span>
            <span v-else>✏️ MODIFICAR AUTOR</span>
          </h5>
        </div>
        <div class="card-body p-4" style="background:#faf9ff;">
          <div class="row g-4">
            <!-- Código -->
            <div class="col-md-3">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">
                CÓDIGO <span class="text-danger">*</span>
              </label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">🔖</span>
                <input type="text" class="form-control border-start-0 ps-1 shadow-none"
                  :class="{'is-invalid border-danger': errores.codigo}"
                  v-model.trim="form.codigo"
                  placeholder="Ej: AUT-001" maxlength="20"
                  style="background:white;font-size:.95rem;" />
                <div class="invalid-feedback">{{ errores.codigo }}</div>
              </div>
            </div>

            <!-- Nombre -->
            <div class="col-md-5">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">
                NOMBRE COMPLETO <span class="text-danger">*</span>
              </label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">👤</span>
                <input type="text" class="form-control border-start-0 ps-1 shadow-none"
                  :class="{'is-invalid border-danger': errores.nombre}"
                  v-model.trim="form.nombre"
                  placeholder="Ingrese el nombre completo"
                  style="background:white;font-size:.95rem;" />
                <div class="invalid-feedback">{{ errores.nombre }}</div>
              </div>
            </div>

            <!-- País -->
            <div class="col-md-2">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">PAÍS</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">🌍</span>
                <input type="text" class="form-control border-start-0 ps-1 shadow-none"
                  v-model.trim="form.pais"
                  placeholder="Ej: Colombia"
                  style="background:white;font-size:.95rem;" />
              </div>
            </div>

            <!-- Teléfono -->
            <div class="col-md-2">
              <label class="form-label fw-bold mb-1" style="color:#4b5563;font-size:.85rem;">TELÉFONO</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0" style="font-size:1rem;">📞</span>
                <input type="text" class="form-control border-start-0 ps-1 shadow-none"
                  v-model.trim="form.telefono"
                  placeholder="+503 0000-0000" maxlength="20"
                  style="background:white;font-size:.95rem;" />
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12 d-flex justify-content-end gap-2">
              <button class="btn px-4 py-2 fw-semibold text-white shadow-sm"
                style="background:linear-gradient(135deg,#4f46e5,#7c3aed);
                       border:none;border-radius:12px;font-size:.95rem;"
                @click="guardar">
                <span v-if="!form.idAutor">💾 Guardar Autor</span>
                <span v-else>✏️ Actualizar Autor</span>
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
        <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:1.2rem 1.5rem;">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="text-white fw-bold mb-0">
              <span style="margin-right:10px;">📋</span> LISTADO DE AUTORES
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
                <span class="input-group-text bg-transparent border-white text-white">🔖</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.codigo" @input="filtrar"
                  placeholder="Buscar por código..."
                  style="font-size:.9rem;" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">👤</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.nombre" @input="filtrar"
                  placeholder="Buscar por nombre..."
                  style="font-size:.9rem;" />
              </div>
            </div>
            <div class="col-md-3">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">🌍</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.pais" @input="filtrar"
                  placeholder="Buscar por país..."
                  style="font-size:.9rem;" />
              </div>
            </div>
            <div class="col-md-2">
              <button @click="limpiarBusqueda" class="btn btn-light w-100" style="border-radius:8px;">
                🔄 Limpiar
              </button>
            </div>
          </div>
        </div>

        <!-- Tabla -->
        <div style="overflow-x:auto;max-height:500px;overflow-y:auto;">
          <table class="table table-hover mb-0">
            <thead style="position:sticky;top:0;z-index:2;background:#f0eefb;">
              <tr>
                <th style="padding:15px 16px;">#</th>
                <th style="padding:15px 16px;">CÓDIGO</th>
                <th style="padding:15px 16px;">NOMBRE</th>
                <th style="padding:15px 16px;">PAÍS</th>
                <th style="padding:15px 16px;">TELÉFONO</th>
                <th style="padding:15px 16px;text-align:center;">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(a, i) in listaFiltrada" :key="a.idAutor"
                :class="{ 'table-primary': form.idAutor === a.idAutor }">
                <td style="padding:12px 16px;">{{ i + 1 }}</td>
                <td style="padding:12px 16px;">
                  <span class="badge" style="background:#ede9fe;color:#5b21b6;padding:6px 12px;">
                    {{ a.codigo }}
                  </span>
                </td>
                <td style="padding:12px 16px;font-weight:600;">{{ a.nombre }}</td>
                <td style="padding:12px 16px;">
                  <span v-if="a.pais">🌍 {{ a.pais }}</span>
                  <span v-else class="text-muted">—</span>
                </td>
                <td style="padding:12px 16px;">
                  <span v-if="a.telefono">📞 {{ a.telefono }}</span>
                  <span v-else class="text-muted">—</span>
                </td>
                <td style="padding:12px 16px;text-align:center;">
                  <button @click="cargarEdicion(a)" class="btn btn-sm btn-primary me-2 btn-action"
                    style="background:linear-gradient(135deg,#4f46e5,#7c3aed);border:none;">
                    ✏️ Editar
                  </button>
                  <button @click="eliminar(a.idAutor)" class="btn btn-sm btn-danger btn-action"
                    style="background:linear-gradient(135deg,#ef4444,#dc2626);border:none;">
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
              <tr v-if="listaFiltrada.length === 0">
                <td colspan="6" style="text-align:center;padding:60px 20px;">
                  <div style="font-size:3.5rem;margin-bottom:15px;">📭</div>
                  <h5 style="color:#9ca3af;">No se encontraron autores</h5>
                  <p style="color:#d1d5db;">Registre un nuevo autor o cambie los filtros de búsqueda</p>
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
            listaFiltrada: [],
            form: { idAutor: null, codigo: '', nombre: '', pais: '', telefono: '' },
            errores: { codigo: '', nombre: '' },
            busqueda: { codigo: '', nombre: '', pais: '' } // 3 campos de búsqueda
        };
    },

    async mounted() {
        await this.cargarLista();
    },

    methods: {
        async cargarLista() {
            this.lista = await db.table('autor').toArray();
            this.filtrar();
        },
        
        filtrar() {
            const c = this.busqueda.codigo.toLowerCase();
            const n = this.busqueda.nombre.toLowerCase();
            const p = this.busqueda.pais.toLowerCase();
            
            this.listaFiltrada = this.lista.filter(a =>
                (a.codigo || '').toLowerCase().includes(c) &&
                (a.nombre || '').toLowerCase().includes(n) &&
                (a.pais || '').toLowerCase().includes(p)
            );
        },
        
        limpiarBusqueda() {
            this.busqueda = { codigo: '', nombre: '', pais: '' };
            this.filtrar();
        },
        
        validar() {
            this.errores = { codigo: '', nombre: '' };
            let ok = true;
            if (!this.form.codigo) { 
                this.errores.codigo = 'El código es obligatorio'; 
                ok = false; 
            }
            if (!this.form.nombre) { 
                this.errores.nombre = 'El nombre es obligatorio'; 
                ok = false; 
            }
            return ok;
        },
        
        async guardar() {
            if (!this.validar()) return;
            
            try {
                const datos = {
                    codigo: this.form.codigo,
                    nombre: this.form.nombre,
                    pais: this.form.pais,
                    telefono: this.form.telefono
                };
                
                if (this.form.idAutor) {
                    await db.table('autor').update(this.form.idAutor, datos);
                    alertify.success('✅ Autor actualizado correctamente');
                } else {
                    await db.table('autor').add(datos);
                    alertify.success('✅ Autor registrado correctamente');
                }
                
                this.limpiar();
                await this.cargarLista();
            } catch (e) {
                alertify.error('❌ Error: ' + e.message);
            }
        },
        
        cargarEdicion(a) {
            this.form = { ...a };
            this.errores = { codigo: '', nombre: '' };
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        
        modificarAutor(data) {
            this.cargarEdicion(data);
        },
        
        limpiar() {
            this.form = { idAutor: null, codigo: '', nombre: '', pais: '', telefono: '' };
            this.errores = { codigo: '', nombre: '' };
        },
        
        async eliminar(id) {
            alertify.confirm(
                'Confirmar eliminación',
                '¿Está seguro que desea eliminar este autor?',
                async () => {
                    await db.table('autor').delete(id);
                    alertify.success('🗑️ Autor eliminado');
                    if (this.form.idAutor === id) this.limpiar();
                    await this.cargarLista();
                },
                () => {}
            ).setHeader('⚠️ Advertencia');
        }
    }
};

window.Autor = autor;
