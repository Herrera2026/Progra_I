const libros = {
    template: `
    <div class="container-fluid py-4">

      <!-- HEADER -->
      <div class="d-flex align-items-center gap-3 mb-4">
        <div style="width:46px;height:46px;border-radius:14px;
             background:linear-gradient(135deg,#0ea5e9,#2563eb);
             display:flex;align-items:center;justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
          </svg>
        </div>
        <div>
          <h4 class="mb-0 fw-bold" style="color:#1e3a5f">Gestión de Libros</h4>
          <small style="color:#6b7280">Registre y administre el catálogo de libros</small>
        </div>
      </div>

      <div class="row g-4">

        <!-- ═══ FORMULARIO ═══ -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm" style="border-radius:1.2rem;overflow:hidden;">

            <div style="background:linear-gradient(135deg,#0ea5e9,#2563eb);padding:1rem 1.4rem;">
              <h6 class="mb-0 text-white fw-semibold">
                {{ form.idLibro ? '✏️ Modificar Libro' : '➕ Nuevo Libro' }}
              </h6>
            </div>

            <div class="card-body p-4">

              <!-- ISBN -->
              <div class="mb-3">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">
                  ISBN (CÓDIGO) <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0" style="font-size:.85rem;">📘</span>
                  <input type="text" class="form-control border-start-0 ps-1"
                    :class="{'is-invalid': errores.isbn}"
                    v-model.trim="form.isbn"
                    placeholder="Ej: 978-3-16-148410-0"
                    style="font-size:.9rem;" />
                  <div class="invalid-feedback">{{ errores.isbn }}</div>
                </div>
              </div>

              <!-- Título -->
              <div class="mb-3">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">
                  TÍTULO <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0" style="font-size:.85rem;">📖</span>
                  <input type="text" class="form-control border-start-0 ps-1"
                    :class="{'is-invalid': errores.titulo}"
                    v-model.trim="form.titulo"
                    placeholder="Título del libro"
                    style="font-size:.9rem;" />
                  <div class="invalid-feedback">{{ errores.titulo }}</div>
                </div>
              </div>

              <!-- Autor -->
              <div class="mb-3">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">
                  AUTOR <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0" style="font-size:.85rem;">👤</span>
                  <select class="form-select border-start-0"
                    :class="{'is-invalid': errores.idAutor}"
                    v-model="form.idAutor"
                    style="font-size:.9rem;">
                    <option value="">— Seleccione un autor —</option>
                    <option v-for="a in autores" :key="a.idAutor" :value="a.idAutor">
                      {{ a.nombre }} ({{ a.codigo }})
                    </option>
                  </select>
                  <div class="invalid-feedback">{{ errores.idAutor }}</div>
                </div>
              </div>

              <!-- Editorial -->
              <div class="mb-3">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">EDITORIAL</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0" style="font-size:.85rem;">🏢</span>
                  <input type="text" class="form-control border-start-0 ps-1"
                    v-model.trim="form.editorial"
                    placeholder="Editorial"
                    style="font-size:.9rem;" />
                </div>
              </div>

              <!-- Edición -->
              <div class="mb-4">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">EDICIÓN</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0" style="font-size:.85rem;">🔢</span>
                  <input type="text" class="form-control border-start-0 ps-1"
                    v-model.trim="form.edicion"
                    placeholder="Ej: 1ra Edición"
                    style="font-size:.9rem;" />
                </div>
              </div>

              <!-- Botones -->
              <div class="d-flex gap-2">
                <button class="btn fw-semibold flex-fill text-white"
                  style="background:linear-gradient(135deg,#0ea5e9,#2563eb);border:none;border-radius:10px;"
                  @click="guardar">
                  <span v-if="!form.idLibro">💾 Guardar</span>
                  <span v-else>✏️ Actualizar</span>
                </button>
                <button class="btn btn-outline-secondary fw-semibold px-3" style="border-radius:10px;"
                  @click="limpiar">
                  🔄 Nuevo
                </button>
              </div>
            </div>
          </div>

          <!-- Contador -->
          <div class="card border-0 shadow-sm mt-3" style="border-radius:1rem;">
            <div class="card-body py-3 px-4 d-flex justify-content-between align-items-center">
              <span class="text-muted small">Total libros registrados</span>
              <span class="badge rounded-pill px-3 fs-6 text-white"
                style="background:linear-gradient(135deg,#0ea5e9,#2563eb)">
                {{ lista.length }}
              </span>
            </div>
          </div>
        </div>

        <!-- ═══ TABLA ═══ -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm h-100" style="border-radius:1.2rem;overflow:hidden;">

            <!-- Barra búsqueda oscura -->
            <div style="background:linear-gradient(135deg,#0c1a2e,#1e3a5f);padding:1rem 1.4rem;">
              <h6 class="text-white fw-bold mb-2 text-uppercase" style="font-size:.78rem;letter-spacing:1.5px;">
                🔍 Búsqueda
              </h6>
              <div class="row g-2">
                <div class="col-sm-3">
                  <input type="text" class="form-control form-control-sm"
                    v-model="busqueda.isbn" @input="filtrar" placeholder="🔎 ISBN..."
                    style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                           color:#fff;border-radius:8px;font-size:.82rem;" />
                </div>
                <div class="col-sm-3">
                  <input type="text" class="form-control form-control-sm"
                    v-model="busqueda.titulo" @input="filtrar" placeholder="🔎 Título..."
                    style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                           color:#fff;border-radius:8px;font-size:.82rem;" />
                </div>
                <div class="col-sm-3">
                  <input type="text" class="form-control form-control-sm"
                    v-model="busqueda.editorial" @input="filtrar" placeholder="🔎 Editorial..."
                    style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                           color:#fff;border-radius:8px;font-size:.82rem;" />
                </div>
                <div class="col-sm-3">
                  <input type="text" class="form-control form-control-sm"
                    v-model="busqueda.edicion" @input="filtrar" placeholder="🔎 Edición..."
                    style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                           color:#fff;border-radius:8px;font-size:.82rem;" />
                </div>
              </div>
            </div>

            <!-- Tabla -->
            <div style="overflow-x:auto;max-height:420px;overflow-y:auto;">
              <table class="table align-middle mb-0 small" style="min-width:700px;">
                <thead style="position:sticky;top:0;z-index:2;">
                  <tr style="background:#f0f7ff;">
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#374151;
                               border-bottom:2px solid #bfdbfe;width:40px;">#</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#374151;
                               border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">ISBN</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#374151;
                               border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">TÍTULO</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#374151;
                               border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">AUTOR</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#374151;
                               border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">EDITORIAL</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#374151;
                               border-bottom:2px solid #bfdbfe;letter-spacing:.8px;">EDICIÓN</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#374151;
                               border-bottom:2px solid #bfdbfe;text-align:center;">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(l, i) in listaFiltrada" :key="l.idLibro"
                    :style="form.idLibro === l.idLibro ? 'background:#dbeafe;' : ''"
                    @mouseover="if(form.idLibro!==l.idLibro) $event.currentTarget.style.background='#eff6ff'"
                    @mouseleave="if(form.idLibro!==l.idLibro) $event.currentTarget.style.background='transparent'"
                    style="border-bottom:1px solid #f3f4f6;transition:background .15s;">

                    <td style="padding:11px 12px;color:#9ca3af;font-size:.82rem;">{{ i + 1 }}</td>

                    <td style="padding:11px 12px;">
                      <span style="background:#dbeafe;color:#1d4ed8;border-radius:6px;
                                   padding:2px 9px;font-size:.74rem;font-weight:700;font-family:monospace;">
                        {{ l.isbn }}
                      </span>
                    </td>

                    <td style="padding:11px 12px;max-width:130px;">
                      <div style="font-weight:600;color:#111827;font-size:.87rem;
                                  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
                           :title="l.titulo">
                        📖 {{ l.titulo }}
                      </div>
                    </td>

                    <td style="padding:11px 12px;">
                      <span style="background:#ede9fe;color:#5b21b6;border-radius:20px;
                                   padding:2px 10px;font-size:.76rem;font-weight:600;">
                        👤 {{ nombreAutor(l.idAutor) }}
                      </span>
                    </td>

                    <td style="padding:11px 12px;color:#374151;font-size:.85rem;">
                      {{ l.editorial || '—' }}
                    </td>

                    <td style="padding:11px 12px;">
                      <span v-if="l.edicion"
                        style="background:#f0fdf4;color:#15803d;border-radius:6px;
                               padding:2px 9px;font-size:.76rem;font-weight:600;">
                        {{ l.edicion }}
                      </span>
                      <span v-else style="color:#d1d5db;">—</span>
                    </td>

                    <td style="padding:11px 12px;text-align:center;">
                      <button @click="cargarEdicion(l)"
                        style="background:linear-gradient(135deg,#0ea5e9,#2563eb);
                               border:none;color:#fff;border-radius:7px;
                               padding:4px 11px;font-size:.78rem;cursor:pointer;margin-right:5px;">
                        ✏️
                      </button>
                      <button @click="eliminar(l.idLibro)"
                        style="background:linear-gradient(135deg,#ef4444,#dc2626);
                               border:none;color:#fff;border-radius:7px;
                               padding:4px 11px;font-size:.78rem;cursor:pointer;">
                        🗑️
                      </button>
                    </td>
                  </tr>

                  <tr v-if="listaFiltrada.length === 0">
                    <td colspan="7" style="text-align:center;padding:50px 20px;">
                      <div style="font-size:2.5rem;">📚</div>
                      <div style="color:#9ca3af;font-weight:600;margin-top:8px;">No se encontraron libros</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Footer -->
            <div style="background:#f9fafb;padding:9px 16px;border-top:1px solid #f3f4f6;
                        display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:.78rem;color:#9ca3af;">
                Mostrando <strong>{{ listaFiltrada.length }}</strong> de <strong>{{ lista.length }}</strong>
              </span>
              <button @click="limpiarBusqueda"
                style="background:none;border:1px solid #bfdbfe;border-radius:7px;
                       color:#2563eb;font-size:.76rem;padding:3px 12px;cursor:pointer;">
                🔄 Limpiar filtros
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>`,

    emits: ['buscar'],
    props: ['forms'],

    data() {
        return {
            lista: [],
            autores: [],
            listaFiltrada: [],
            form:    { idLibro: null, idAutor: '', isbn: '', titulo: '', editorial: '', edicion: '' },
            errores: { isbn: '', titulo: '', idAutor: '' },
            busqueda:{ isbn: '', titulo: '', editorial: '', edicion: '' }
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
            const i  = this.busqueda.isbn.toLowerCase();
            const t  = this.busqueda.titulo.toLowerCase();
            const e  = this.busqueda.editorial.toLowerCase();
            const ed = this.busqueda.edicion.toLowerCase();
            this.listaFiltrada = this.lista.filter(l =>
                (l.isbn      || '').toLowerCase().includes(i) &&
                (l.titulo    || '').toLowerCase().includes(t) &&
                (l.editorial || '').toLowerCase().includes(e) &&
                (l.edicion   || '').toLowerCase().includes(ed)
            );
        },
        limpiarBusqueda() {
            this.busqueda = { isbn: '', titulo: '', editorial: '', edicion: '' };
            this.filtrar();
        },
        nombreAutor(idAutor) {
            const a = this.autores.find(x => x.idAutor === idAutor);
            return a ? a.nombre : '—';
        },
        validar() {
            this.errores = { isbn: '', titulo: '', idAutor: '' };
            let ok = true;
            if (!this.form.isbn)    { this.errores.isbn    = 'El ISBN es obligatorio';   ok = false; }
            if (!this.form.titulo)  { this.errores.titulo  = 'El título es obligatorio'; ok = false; }
            if (!this.form.idAutor) { this.errores.idAutor = 'Seleccione un autor';      ok = false; }
            return ok;
        },
        async guardar() {
            if (!this.validar()) return;
            try {
                const datos = {
                    idAutor:   this.form.idAutor,
                    isbn:      this.form.isbn,
                    titulo:    this.form.titulo,
                    editorial: this.form.editorial,
                    edicion:   this.form.edicion
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
            this.form    = { ...l };
            this.errores = { isbn: '', titulo: '', idAutor: '' };
        },
        modificarLibro(data) {
            this.cargarEdicion(data);
        },
        limpiar() {
            this.form    = { idLibro: null, idAutor: '', isbn: '', titulo: '', editorial: '', edicion: '' };
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
    },

    watch: {
        'forms.libros.mostrar'(val) {
            if (val) { this.cargarAutores(); this.cargarLista(); }
        }
    }
};