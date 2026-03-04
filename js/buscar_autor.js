const buscar_autor = {
    template: `
    <div class="container-fluid py-4">
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
          <h2 class="mb-0 fw-bold" style="color:#1e1b4b">Búsqueda de Autores</h2>
          <p class="mb-0" style="color:#6b7280">Consulte, edite o elimine autores registrados</p>
        </div>
      </div>

      <div class="card border-0 shadow-lg" style="border-radius:1.5rem;overflow:hidden;">
        <!-- Barra de búsqueda -->
        <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:1.2rem 1.5rem;">
          <h5 class="text-white fw-bold mb-3">🔍 BUSCAR AUTOR</h5>
          <div class="row g-3">
            <div class="col-md-3">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">🔖</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.codigo" @input="filtrar" placeholder="Buscar por código...">
              </div>
            </div>
            <div class="col-md-3">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">👤</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.nombre" @input="filtrar" placeholder="Buscar por nombre...">
              </div>
            </div>
            <div class="col-md-3">
              <div class="input-group">
                <span class="input-group-text bg-transparent border-white text-white">🌍</span>
                <input type="text" class="form-control bg-transparent text-white border-white"
                  v-model="busqueda.pais" @input="filtrar" placeholder="Buscar por país...">
              </div>
            </div>
            <div class="col-md-3">
              <button @click="limpiarFiltros" class="btn btn-light w-100">🔄 Limpiar filtros</button>
            </div>
          </div>
          <div class="d-flex gap-3 mt-3">
            <span class="badge" style="background:rgba(255,255,255,.15);padding:8px 16px;">
              Total: <strong class="text-white ms-1">{{ lista.length }}</strong>
            </span>
            <span class="badge" style="background:rgba(255,255,255,.15);padding:8px 16px;">
              Filtrados: <strong class="text-white ms-1">{{ listaFiltrada.length }}</strong>
            </span>
          </div>
        </div>

        <!-- Tabla de resultados -->
        <div style="overflow-x:auto;max-height:550px;overflow-y:auto;">
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
              <tr v-for="(a, i) in listaFiltrada" :key="a.idAutor">
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
                <td style="padding:12px 16px;">{{ a.telefono || '—' }}</td>
                <td style="padding:12px 16px;text-align:center;">
                  <button @click="$emit('modificar', a)" class="btn btn-sm btn-primary me-2"
                    style="background:linear-gradient(135deg,#4f46e5,#7c3aed);border:none;">
                    ✏️ Editar
                  </button>
                  <button @click="eliminar(a.idAutor)" class="btn btn-sm btn-danger"
                    style="background:linear-gradient(135deg,#ef4444,#dc2626);border:none;">
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
              <tr v-if="listaFiltrada.length === 0">
                <td colspan="6" style="text-align:center;padding:60px;">
                  <div style="font-size:3.5rem;">📭</div>
                  <h5 style="color:#9ca3af;">No se encontraron autores</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`,

    emits: ['modificar'],

    data() {
        return {
            lista: [],
            listaFiltrada: [],
            busqueda: { codigo: '', nombre: '', pais: '' }
        };
    },

    methods: {
        async obtenerAutores() {
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
        
        limpiarFiltros() {
            this.busqueda = { codigo: '', nombre: '', pais: '' };
            this.filtrar();
        },
        
        async eliminar(id) {
            alertify.confirm(
                'Confirmar eliminación',
                '¿Está seguro que desea eliminar este autor?',
                async () => {
                    await db.table('autor').delete(id);
                    alertify.success('🗑️ Autor eliminado correctamente');
                    await this.obtenerAutores();
                },
                () => {}
            ).setHeader('⚠️ Advertencia');
        }
    }
};

window.BuscarAutor = buscar_autor;
