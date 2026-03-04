const autor = {
    template: `
    <div class="container-fluid py-4">

      <!-- HEADER -->
      <div class="d-flex align-items-center gap-3 mb-4">
        <div style="width:46px;height:46px;border-radius:14px;
             background:linear-gradient(135deg,#4f46e5,#7c3aed);
             display:flex;align-items:center;justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        </div>
        <div>
          <h4 class="mb-0 fw-bold" style="color:#1e1b4b">Gestión de Autores</h4>
          <small style="color:#6b7280">Registre y administre los autores del sistema</small>
        </div>
      </div>

      <div class="row g-4">

        <!-- ═══ FORMULARIO ═══ -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm" style="border-radius:1.2rem;overflow:hidden;">

            <!-- Header formulario -->
            <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:1rem 1.4rem;">
              <h6 class="mb-0 text-white fw-semibold">
                {{ form.idAutor ? '✏️ Modificar Autor' : '➕ Nuevo Autor' }}
              </h6>
            </div>

            <div class="card-body p-4">

              <!-- Código -->
              <div class="mb-3">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">
                  CÓDIGO <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0 text-muted" style="font-size:.85rem;">🔖</span>
                  <input type="text" class="form-control border-start-0 ps-1"
                    :class="{'is-invalid': errores.codigo}"
                    v-model.trim="form.codigo"
                    placeholder="Ej: AUT-001" maxlength="20"
                    style="font-size:.9rem;" />
                  <div class="invalid-feedback">{{ errores.codigo }}</div>
                </div>
              </div>

              <!-- Nombre -->
              <div class="mb-3">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">
                  NOMBRE <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0 text-muted" style="font-size:.85rem;">👤</span>
                  <input type="text" class="form-control border-start-0 ps-1"
                    :class="{'is-invalid': errores.nombre}"
                    v-model.trim="form.nombre"
                    placeholder="Nombre completo del autor"
                    style="font-size:.9rem;" />
                  <div class="invalid-feedback">{{ errores.nombre }}</div>
                </div>
              </div>

              <!-- País -->
              <div class="mb-3">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">PAÍS</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0 text-muted" style="font-size:.85rem;">🌍</span>
                  <input type="text" class="form-control border-start-0 ps-1"
                    v-model.trim="form.pais"
                    placeholder="País de origen"
                    style="font-size:.9rem;" />
                </div>
              </div>

              <!-- Teléfono -->
              <div class="mb-4">
                <label class="form-label fw-semibold small" style="color:#6b7280;letter-spacing:.5px;">TELÉFONO</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0 text-muted" style="font-size:.85rem;">📞</span>
                  <input type="text" class="form-control border-start-0 ps-1"
                    v-model.trim="form.telefono"
                    placeholder="Ej: +503 7000-0000" maxlength="20"
                    style="font-size:.9rem;" />
                </div>
              </div>

              <!-- Botones -->
              <div class="d-flex gap-2">
                <button class="btn fw-semibold flex-fill text-white"
                  style="background:linear-gradient(135deg,#4f46e5,#7c3aed);border:none;border-radius:10px;"
                  @click="guardar">
                  <span v-if="!form.idAutor">💾 Guardar</span>
                  <span v-else>✏️ Actualizar</span>
                </button>
                <button class="btn btn-outline-secondary fw-semibold px-3" style="border-radius:10px;"
                  @click="limpiar" title="Nuevo / Limpiar">
                  🔄 Nuevo
                </button>
              </div>

            </div>
          </div>

          <!-- Contador -->
          <div class="card border-0 shadow-sm mt-3" style="border-radius:1rem;">
            <div class="card-body py-3 px-4 d-flex justify-content-between align-items-center">
              <span class="text-muted small">Total autores registrados</span>
              <span class="badge rounded-pill px-3 fs-6 text-white"
                style="background:linear-gradient(135deg,#4f46e5,#7c3aed)">
                {{ lista.length }}
              </span>
            </div>
          </div>
        </div>

        <!-- ═══ TABLA ═══ -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm h-100" style="border-radius:1.2rem;overflow:hidden;">

            <!-- Barra de búsqueda oscura -->
            <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:1rem 1.4rem;">
              <h6 class="text-white fw-bold mb-2 text-uppercase" style="font-size:.78rem;letter-spacing:1.5px;">
                🔍 Búsqueda
              </h6>
              <div class="row g-2">
                <div class="col-sm-4">
                  <input type="text" class="form-control form-control-sm"
                    v-model="busqueda.codigo" @input="filtrar" placeholder="🔎 Código..."
                    style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                           color:#fff;border-radius:8px;font-size:.82rem;" />
                </div>
                <div class="col-sm-4">
                  <input type="text" class="form-control form-control-sm"
                    v-model="busqueda.nombre" @input="filtrar" placeholder="🔎 Nombre..."
                    style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                           color:#fff;border-radius:8px;font-size:.82rem;" />
                </div>
                <div class="col-sm-4">
                  <input type="text" class="form-control form-control-sm"
                    v-model="busqueda.pais" @input="filtrar" placeholder="🔎 País..."
                    style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);
                           color:#fff;border-radius:8px;font-size:.82rem;" />
                </div>
              </div>
            </div>

            <!-- Tabla -->
            <div style="overflow-x:auto;max-height:420px;overflow-y:auto;">
              <table class="table align-middle mb-0 small">
                <thead style="position:sticky;top:0;z-index:2;">
                  <tr style="background:#f8f7ff;">
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#4b5563;
                               border-bottom:2px solid #e0e7ff;width:40px;">#</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#4b5563;
                               border-bottom:2px solid #e0e7ff;letter-spacing:.8px;">CÓDIGO</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#4b5563;
                               border-bottom:2px solid #e0e7ff;letter-spacing:.8px;">NOMBRE</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#4b5563;
                               border-bottom:2px solid #e0e7ff;letter-spacing:.8px;">PAÍS</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#4b5563;
                               border-bottom:2px solid #e0e7ff;letter-spacing:.8px;">TELÉFONO</th>
                    <th style="padding:12px;font-size:.75rem;font-weight:700;color:#4b5563;
                               border-bottom:2px solid #e0e7ff;text-align:center;">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(a, i) in listaFiltrada" :key="a.idAutor"
                    :style="form.idAutor === a.idAutor
                      ? 'background:#ede9fe;'
                      : 'background:transparent;transition:background .15s;'"
                    @mouseover="if(form.idAutor!==a.idAutor) $event.currentTarget.style.background='#f5f3ff'"
                    @mouseleave="if(form.idAutor!==a.idAutor) $event.currentTarget.style.background='transparent'"
                    style="border-bottom:1px solid #f3f4f6;">

                    <td style="padding:11px 12px;color:#9ca3af;font-size:.82rem;">{{ i + 1 }}</td>

                    <td style="padding:11px 12px;">
                      <span style="background:#ede9fe;color:#5b21b6;border-radius:6px;
                                   padding:2px 9px;font-size:.76rem;font-weight:700;letter-spacing:.5px;">
                        {{ a.codigo }}
                      </span>
                    </td>

                    <td style="padding:11px 12px;font-weight:600;color:#111827;font-size:.87rem;">
                      {{ a.nombre }}
                    </td>

                    <td style="padding:11px 12px;color:#374151;font-size:.85rem;">
                      <span v-if="a.pais">🌍 {{ a.pais }}</span>
                      <span v-else style="color:#d1d5db;">—</span>
                    </td>

                    <td style="padding:11px 12px;color:#374151;font-size:.85rem;">
                      {{ a.telefono || '—' }}
                    </td>

                    <td style="padding:11px 12px;text-align:center;">
                      <button @click="cargarEdicion(a)" title="Editar"
                        style="background:linear-gradient(135deg,#4f46e5,#7c3aed);
                               border:none;color:#fff;border-radius:7px;
                               padding:4px 11px;font-size:.78rem;cursor:pointer;margin-right:5px;">
                        ✏️
                      </button>
                      <button @click="eliminar(a.idAutor)" title="Eliminar"
                        style="background:linear-gradient(135deg,#ef4444,#dc2626);
                               border:none;color:#fff;border-radius:7px;
                               padding:4px 11px;font-size:.78rem;cursor:pointer;">
                        🗑️
                      </button>
                    </td>
                  </tr>

                  <tr v-if="listaFiltrada.length === 0">
                    <td colspan="6" style="text-align:center;padding:50px 20px;">
                      <div style="font-size:2.5rem;">📭</div>
                      <div style="color:#9ca3af;font-weight:600;margin-top:8px;">No se encontraron autores</div>
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
                style="background:none;border:1px solid #e0e7ff;border-radius:7px;
                       color:#4f46e5;font-size:.76rem;padding:3px 12px;cursor:pointer;">
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
            listaFiltrada: [],
            form:    { idAutor: null, codigo: '', nombre: '', pais: '', telefono: '' },
            errores: { codigo: '', nombre: '' },
            busqueda:{ codigo: '', nombre: '', pais: '' }
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
                (a.pais   || '').toLowerCase().includes(p)
            );
        },

        limpiarBusqueda() {
            this.busqueda = { codigo: '', nombre: '', pais: '' };
            this.filtrar();
        },

        validar() {
            this.errores = { codigo: '', nombre: '' };
            let ok = true;
            if (!this.form.codigo) { this.errores.codigo = 'El código es obligatorio'; ok = false; }
            if (!this.form.nombre) { this.errores.nombre = 'El nombre es obligatorio'; ok = false; }
            return ok;
        },

        async guardar() {
            if (!this.validar()) return;
            try {
                const datos = {
                    codigo:   this.form.codigo,
                    nombre:   this.form.nombre,
                    pais:     this.form.pais,
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
            this.form    = { ...a };
            this.errores = { codigo: '', nombre: '' };
        },

        modificarAutor(data) {
            this.cargarEdicion(data);
        },

        limpiar() {
            this.form    = { idAutor: null, codigo: '', nombre: '', pais: '', telefono: '' };
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
    },

    watch: {
        'forms.autor.mostrar'(val) {
            if (val) this.cargarLista();
        }
    }
};