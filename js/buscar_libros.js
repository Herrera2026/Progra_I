const buscar_libros = {
    template: `
    <div class="container-fluid py-4">

      <div class="d-flex align-items-center gap-3 mb-4">
        <div style="width:46px;height:46px;border-radius:14px;
             background:linear-gradient(135deg,#0ea5e9,#2563eb);
             display:flex;align-items:center;justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
          </svg>
        </div>
        <div>
          <h4 class="mb-0 fw-bold" style="color:#1e3a5f">Búsqueda de Libros</h4>
          <small style="color:#6b7280">Consulte, edite o elimine libros del catálogo</small>
        </div>
      </div>

      <div class="card border-0 shadow-sm" style="border-radius:1.2rem;overflow:hidden;">

        <!-- Barra oscura -->
        <div style="background:linear-gradient(135deg,#0c1a2e,#1e3a5f);padding:1.2rem 1.5rem;">
          <h6 class="text-white fw-bold mb-3 text-uppercase"
            style="letter-spacing:1.5px;font-size:.78rem;">🔍 BUSCAR LIBRO</h6>
          <div class="row g-2">
            <div class="col-sm-3">
              <input type="text" class="form-control form-control-sm"
                v-model="busqueda.isbn" @input="filtrar" placeholder="🔎 ISBN..."
                style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                       color:#fff;border-radius:8px;font-size:.83rem;" />
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control form-control-sm"
                v-model="busqueda.titulo" @input="filtrar" placeholder="🔎 Título..."
                style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                       color:#fff;border-radius:8px;font-size:.83rem;" />
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control form-control-sm"
                v-model="busqueda.autor" @input="filtrar" placeholder="🔎 Autor..."
                style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                       color:#fff;border-radius:8px;font-size:.83rem;" />
            </div>
            <div class="col-sm-3">
              <input type="text" class="form-control form-control-sm"
                v-model="busqueda.editorial" @input="filtrar" placeholder="🔎 Editorial..."
                style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                       color:#fff;border-radius:8px;font-size:.83rem;" />
            </div>
          </div>
          <div class="d-flex gap-3 mt-3">
            <div style="background:rgba(255,255,255,.08);border-radius:8px;
                        padding:5px 14px;display:flex;align-items:center;gap:8px;">
              <span style="color:#7dd3fc;font-size:.73rem;">TOTAL</span>
              <span class="fw-bold text-white">{{ lista.length }}</span>
            </div>
            <div style="background:rgba(255,255,255,.08);border-radius:8px;
                        padding:5px 14px;display:flex;align-items:center;gap:8px;">
              <span style="color:#7dd3fc;font-size:.73rem;">FILTRADOS</span>
              <span class="fw-bold text-white">{{ listaFiltrada.length }}</span>
            </div>
          </div>
        </div>

        <!-- Tabla -->
        <div style="overflow-x:auto;max-height:500px;overflow-y:auto;">
          <table class="table align-middle mb-0" style="min-width:780px;">
            <thead style="position:sticky;top:0;z-index:2;">
              <tr style="background:#f0f7ff;">
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#374151;
                           border-bottom:2px solid #bfdbfe;width:42px;">#</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#374151;
                           border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">ISBN</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#374151;
                           border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">TÍTULO</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#374151;
                           border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">AUTOR</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#374151;
                           border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">EDITORIAL</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#374151;
                           border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">EDICIÓN</th>
                <th style="padding:13px 12px;font-size:.76rem;font-weight:700;color:#374151;
                           border-bottom:2px solid #bfdbfe;text-align:center;">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(l, i) in listaFiltrada" :key="l.idLibro"
                style="border-bottom:1px solid #f3f4f6;transition:background .15s;"
                @mouseover="$event.currentTarget.style.background='#eff6ff'"
                @mouseleave="$event.currentTarget.style.background='transparent'">

                <td style="padding:12px;color:#9ca3af;font-size:.82rem;">{{ i + 1 }}</td>

                <td style="padding:12px;">
                  <span style="background:#dbeafe;color:#1d4ed8;border-radius:6px;
                               padding:2px 10px;font-size:.74rem;font-weight:700;font-family:monospace;">
                    {{ l.isbn }}
                  </span>
                </td>

                <td style="padding:12px;max-width:160px;">
                  <div style="font-weight:600;color:#111827;font-size:.87rem;
                              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
                       :title="l.titulo">
                    📖 {{ l.titulo }}
                  </div>
                </td>

                <td style="padding:12px;">
                  <span style="background:#ede9fe;color:#5b21b6;border-radius:20px;
                               padding:2px 12px;font-size:.76rem;font-weight:600;">
                    👤 {{ nombreAutor(l.idAutor) }}
                  </span>
                </td>

                <td style="padding:12px;color:#374151;font-size:.85rem;">
                  {{ l.editorial || '—' }}
                </td>

                <td style="padding:12px;">
                  <span v-if="l.edicion"
                    style="background:#f0fdf4;color:#15803d;border-radius:6px;
                           padding:2px 9px;font-size:.76rem;font-weight:600;">
                    {{ l.edicion }}
                  </span>
                  <span v-else style="color:#d1d5db;">—</span>
                </td>

                <td style="padding:12px;text-align:center;">
                  <button @click="$emit('modificar', l)"
                    style="background:linear-gradient(135deg,#0ea5e9,#2563eb);
                           border:none;color:#fff;border-radius:8px;
                           padding:5px 13px;font-size:.8rem;cursor:pointer;margin-right:5px;">
                    ✏️ Editar
                  </button>
                  <button @click="eliminar(l.idLibro)"
                    style="background:linear-gradient(135deg,#ef4444,#dc2626);
                           border:none;color:#fff;border-radius:8px;
                           padding:5px 13px;font-size:.8rem;cursor:pointer;">
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>

              <tr v-if="listaFiltrada.length === 0">
                <td colspan="7" style="text-align:center;padding:55px 20px;">
                  <div style="font-size:2.8rem;">📚</div>
                  <div style="color:#9ca3af;font-weight:600;margin-top:8px;">No se encontraron libros</div>
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
            Mostrando <strong>{{ listaFiltrada.length }}</strong> de
            <strong>{{ lista.length }}</strong> registros
          </span>
          <button @click="limpiarFiltros"
            style="background:none;border:1px solid #bfdbfe;border-radius:8px;
                   color:#2563eb;font-size:.76rem;padding:4px 13px;cursor:pointer;">
            🔄 Limpiar filtros
          </button>
        </div>
      </div>
    </div>`,

    emits: ['modificar'],

    data() {
        return {
            lista: [],
            autores: [],
            listaFiltrada: [],
            busqueda: { isbn: '', titulo: '', autor: '', editorial: '' }
        };
    },

    methods: {
        async obtenerLibros() {
            this.lista   = await db.table('libros').toArray();
            this.autores = await db.table('autor').toArray();
            this.filtrar();
        },
        filtrar() {
            const i = this.busqueda.isbn.toLowerCase();
            const t = this.busqueda.titulo.toLowerCase();
            const a = this.busqueda.autor.toLowerCase();
            const e = this.busqueda.editorial.toLowerCase();
            this.listaFiltrada = this.lista.filter(l => {
                const nAutor = this.nombreAutor(l.idAutor).toLowerCase();
                return (l.isbn      || '').toLowerCase().includes(i) &&
                       (l.titulo    || '').toLowerCase().includes(t) &&
                       nAutor.includes(a) &&
                       (l.editorial || '').toLowerCase().includes(e);
            });
        },
        nombreAutor(idAutor) {
            const a = this.autores.find(x => x.idAutor === idAutor);
            return a ? a.nombre : '—';
        },
        limpiarFiltros() {
            this.busqueda = { isbn: '', titulo: '', autor: '', editorial: '' };
            this.filtrar();
        },
        async eliminar(id) {
            alertify.confirm(
                'Confirmar eliminación',
                '¿Está seguro que desea eliminar este libro?',
                async () => {
                    await db.table('libros').delete(id);
                    alertify.success('🗑️ Libro eliminado correctamente');
                    await this.obtenerLibros();
                },
                () => {}
            ).setHeader('⚠️ Advertencia');
        }
    }
};