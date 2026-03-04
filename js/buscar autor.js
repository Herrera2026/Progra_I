const buscar_autor = {
    template: `
    <div class="container-fluid py-4">

      <div class="d-flex align-items-center gap-3 mb-4">
        <div style="width:46px;height:46px;border-radius:14px;
             background:linear-gradient(135deg,#4f46e5,#7c3aed);
             display:flex;align-items:center;justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        </div>
        <div>
          <h4 class="mb-0 fw-bold" style="color:#1e1b4b">Búsqueda de Autores</h4>
          <small style="color:#6b7280">Consulte, edite o elimine autores registrados</small>
        </div>
      </div>

      <div class="card border-0 shadow-sm" style="border-radius:1.2rem;overflow:hidden;">

        <!-- Barra oscura de búsqueda -->
        <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:1.2rem 1.5rem;">
          <h6 class="text-white fw-bold mb-3 text-uppercase"
            style="letter-spacing:1.5px;font-size:.78rem;">🔍 BUSCAR AUTOR</h6>
          <div class="row g-2">
            <div class="col-sm-4">
              <input type="text" class="form-control form-control-sm"
                v-model="busqueda.codigo" @input="filtrar" placeholder="🔎 Código..."
                style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                       color:#fff;border-radius:8px;font-size:.83rem;" />
            </div>
            <div class="col-sm-4">
              <input type="text" class="form-control form-control-sm"
                v-model="busqueda.nombre" @input="filtrar" placeholder="🔎 Nombre..."
                style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                       color:#fff;border-radius:8px;font-size:.83rem;" />
            </div>
            <div class="col-sm-4">
              <input type="text" class="form-control form-control-sm"
                v-model="busqueda.pais" @input="filtrar" placeholder="🔎 País..."
                style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                       color:#fff;border-radius:8px;font-size:.83rem;" />
            </div>
          </div>
          <div class="d-flex gap-3 mt-3">
            <div style="background:rgba(255,255,255,.08);border-radius:8px;
                        padding:5px 14px;display:flex;align-items:center;gap:8px;">
              <span style="color:#a5b4fc;font-size:.73rem;">TOTAL</span>
              <span class="fw-bold text-white">{{ lista.length }}</span>
            </div>
            <div style="background:rgba(255,255,255,.08);border-radius:8px;
                        padding:5px 14px;display:flex;align-items:center;gap:8px;">
              <span style="color:#a5b4fc;font-size:.73rem;">FILTRADOS</span>
              <span class="fw-bold text-white">{{ listaFiltrada.length }}</span>
            </div>
          </div>
        </div>

        <!-- Tabla -->
        <div style="overflow-x:auto;max-height:500px;overflow-y:auto;">
          <table class="table align-middle mb-0" style="min-width:600px;">
            <thead style="position:sticky;top:0;z-index:2;">
              <tr style="background:#f8f7ff;">
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#4b5563;
                           border-bottom:2px solid #e0e7ff;width:42px;">#</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#4b5563;
                           border-bottom:2px solid #e0e7ff;letter-spacing:.8px;">CÓDIGO</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#4b5563;
                           border-bottom:2px solid #e0e7ff;letter-spacing:.8px;">NOMBRE</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#4b5563;
                           border-bottom:2px solid #e0e7ff;letter-spacing:.8px;">PAÍS</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#4b5563;
                           border-bottom:2px solid #e0e7ff;letter-spacing:.8px;">TELÉFONO</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#4b5563;
                           border-bottom:2px solid #e0e7ff;text-align:center;">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(a, i) in listaFiltrada" :key="a.idAutor"
                style="border-bottom:1px solid #f3f4f6;transition:background .15s;"
                @mouseover="$event.currentTarget.style.background='#f5f3ff'"
                @mouseleave="$event.currentTarget.style.background='transparent'">

                <td style="padding:12px;color:#9ca3af;font-size:.82rem;">{{ i + 1 }}</td>
                <td style="padding:12px;">
                  <span style="background:#ede9fe;color:#5b21b6;border-radius:6px;
                               padding:2px 10px;font-size:.76rem;font-weight:700;">
                    {{ a.codigo }}
                  </span>
                </td>
                <td style="padding:12px;font-weight:600;color:#111827;font-size:.87rem;">
                  {{ a.nombre }}
                </td>
                <td style="padding:12px;color:#374151;font-size:.85rem;">
                  <span v-if="a.pais">🌍 {{ a.pais }}</span>
                  <span v-else style="color:#d1d5db;">—</span>
                </td>
                <td style="padding:12px;color:#374151;font-size:.85rem;">
                  {{ a.telefono || '—' }}
                </td>
                <td style="padding:12px;text-align:center;">
                  <button @click="$emit('modificar', a)"
                    style="background:linear-gradient(135deg,#4f46e5,#7c3aed);
                           border:none;color:#fff;border-radius:8px;
                           padding:5px 13px;font-size:.8rem;cursor:pointer;margin-right:5px;">
                    ✏️ Editar
                  </button>
                  <button @click="eliminar(a.idAutor)"
                    style="background:linear-gradient(135deg,#ef4444,#dc2626);
                           border:none;color:#fff;border-radius:8px;
                           padding:5px 13px;font-size:.8rem;cursor:pointer;">
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
              <tr v-if="listaFiltrada.length === 0">
                <td colspan="6" style="text-align:center;padding:55px;">
                  <div style="font-size:2.8rem;">📭</div>
                  <div style="color:#9ca3af;font-weight:600;margin-top:8px;">No se encontraron autores</div>
                  <div style="color:#d1d5db;font-size:.8rem;margin-top:4px;">Intente con otros términos</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb;padding:9px 18px;border-top:1px solid #f3f4f6;
                    display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:.78rem;color:#9ca3af;">
            Mostrando <strong>{{ listaFiltrada.length }}</strong> de <strong>{{ lista.length }}</strong> registros
          </span>
          <button @click="limpiarFiltros"
            style="background:none;border:1px solid #e0e7ff;border-radius:8px;
                   color:#4f46e5;font-size:.76rem;padding:4px 13px;cursor:pointer;">
            🔄 Limpiar filtros
          </button>
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
                (a.pais   || '').toLowerCase().includes(p)
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