<template>
    <div class="container">
        <h1>Usuarios existentes</h1>
        <el-button style="width:805px;margin-bottom:1.4em;" @click="drawer = true">Añadir nuevo usuario</el-button>
        <el-table :data="usersList" stripe align="center">
            <el-table-column prop="name" label="Nombre" width="200" />
            <el-table-column prop="username" label="Username" width="180" />
            <el-table-column prop="email" label="Email" width="240" />
            <el-table-column label="Acciones" width="185" header-align="center" >
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="detailsRow(scope.$index)">Detalles</el-button>
                    <el-popconfirm
                    confirm-button-text="Sí, eliminar"
                    cancel-button-text="No"
                    icon-color="#626AEF"
                    :title="'¿Estás seguro de querer eliminar el username ' + scope.row.username + '?'"
                    @confirm="deleteRow(scope.row.id,scope.$index)">
                        <template #reference>
                            <el-button link type="danger" size="small">Eliminar</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogTableVisible" title="Detalles del usuario" width="80%">
            <el-descriptions
            :column="3"
            border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon ><postcard /></el-icon> ID
                        </div>
                    </template>
                    {{userData[0].id}}
                </el-descriptions-item>
                
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon ><user /></el-icon> Nombre
                        </div>
                    </template>
                    {{userData[0].name}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon ><ChatDotSquare /></el-icon> Username
                        </div>
                    </template>
                    {{userData[0].username}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon ><Message /></el-icon> Email
                        </div>
                    </template>
                    {{userData[0].email}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon><office-building /></el-icon> Dirección
                        </div>
                    </template>
                    {{userData[0].address.street + ", " + userData[0].address.suite + ", " + userData[0].address.city + ", " +  userData[0].address.zipcode}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon><location /></el-icon> Coordenadas
                        </div>
                    </template>
                    {{userData[0].address.geo.lat + ", " + userData[0].address.geo.lng}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon><iphone /></el-icon> Teléfono
                        </div>
                    </template>
                    {{userData[0].phone}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon><Link /></el-icon> Web
                        </div>
                    </template>
                    {{userData[0].website}}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon><OfficeBuilding /></el-icon> Empresa
                        </div>
                    </template>
                    <div><i>Nombre:</i> {{userData[0].company.name}}</div>
                    <div><i>Eslogan:</i> {{userData[0].company.catchPhrase}}</div>
                    <div><i>BS:</i> {{userData[0].company.bs}}</div>
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>

        <el-drawer
        v-model="drawer"
        title="Formulario de nuevo usuario"
        direction="ltr"
        size="60%">
            <div>
                <el-form :model="form">
                    <el-form-item label="Nombre">
                        <el-input v-model="form.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Username">
                        <el-input v-model="form.username" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Email">
                        <el-input v-model="form.email" autocomplete="off" />
                    </el-form-item>
                    
                    <el-form-item class="formCategory" label="Dirección">
                        <el-col>
                            <el-form-item label="Calle">
                                <el-input v-model="form.address.street" autocomplete="off" />
                            </el-form-item>

                            <el-form-item label="Nº / Puerta">
                                <el-input v-model="form.address.suite" autocomplete="off" />
                            </el-form-item>

                            <el-form-item label="Ciudad">
                                <el-input v-model="form.address.city" autocomplete="off" />
                            </el-form-item>

                            <el-form-item label="CP">
                                <el-input v-model="form.address.zipcode" autocomplete="off" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>


                    <el-form-item class="formCategory" label="Ubicación">
                        <el-col>
                            <el-form-item label="Latitud">
                                <el-input v-model="form.address.geo.lat" autocomplete="off" />
                            </el-form-item>
                            
                            <el-form-item label="Longitud">
                                <el-input v-model="form.address.geo.lng" autocomplete="off" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    
                   
                    <el-form-item label="Teléfono">
                        <el-input v-model="form.phone" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Web">
                        <el-input v-model="form.website" autocomplete="off" />
                    </el-form-item>

                    <el-form-item class="formCategory" label="Empresa">
                        <el-col>
                            <el-form-item label="Nombre">
                                <el-input v-model="form.company.name" autocomplete="off" />
                            </el-form-item>

                            <el-form-item label="Eslogan">
                                <el-input v-model="form.company.catchPhrase" autocomplete="off" />
                            </el-form-item>

                            <el-form-item label="BS">
                                <el-input v-model="form.company.bs" autocomplete="off" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>


                    
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">Cancelar</el-button>
                    <el-button type="primary" :loading="loading" @click="sendForm">{{loading ? 'Registrando . . .' : 'Añadir usuario'}}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import axios from 'axios'
import { ElNotification } from 'element-plus'

export default {
    name: 'UsersTable',
    dialogVisible: false,
    props: {msg: String},
    data() {
      return {
        usersList: [],
        userData: [],
        dialogTableVisible: false,
        loading: false,
        drawer: false,
        form:{
            id: '',
            name: '',
            username: '',
            email: '',
            address:{
                street: '',
                suite: '',
                city: '',
                zipcode: '',
                geo: {
                    lat: '',
                    lng: ''
                }
            },
            phone: '',
            website: '',
            company: {
                name: '',
                catchPhrase: '',
                bs: ''
            }
        }
      }
    },
    
    mounted(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(json => {
            if(json.status == 200){this.usersList = json.data}
        })
    },
    methods:{
        detailsRow(index){
            this.userData = Array(this.usersList[index])
            this.dialogTableVisible = true
        },
        deleteRow(userID,index){
            axios.delete("https://jsonplaceholder.typicode.com/users/"+userID)
            .then(json => {
                if(json.status == 200){
                    ElNotification({
                        title: 'Hecho',
                        message: 'El usuario ha sido eliminado',
                        type: 'success',
                    })
                    this.usersList.splice(index, 1)
                }
            })
            .catch(() => {
                ElNotification({
                    title: 'Error',
                    message: 'El usuario no se ha podido eliminar',
                    type: 'error',
                })
            })
        },
        cancelForm(){
            this.loading = false
            this.drawer = false
        },
        sendForm(){
            this.loading = true
            axios.post("https://jsonplaceholder.typicode.com/users/", this.form)
            .then(json => {
                if(json.status == 201){
                    ElNotification({
                        title: 'Hecho',
                        message: 'El usuario ha sido añadido',
                        type: 'success',
                    })
                    this.usersList.push({
                        "id": json.data.id,
                        "name": json.data.name,
                        "username": json.data.username,
                        "email": json.data.email,
                        "address":{
                            "street": json.data.address.street,
                            "suite": json.data.address.suite,
                            "city": json.data.address.city,
                            "zipcode": json.data.address.zipcode,
                            "geo": {
                                "lat": json.data.address.geo.lat,
                                "lng": json.data.address.geo.lng,
                            }
                        },
                        "phone": json.data.phone,
                        "website": json.data.website,
                        "company": {
                            "name": json.data.company.name,
                            "catchPhrase": json.data.company.catchPhrase,
                            "bs": json.data.company.bs,
                        }
                    })
                    this.loading = false
                    this.form = {
                        id: '',
                        name: '',
                        username: '',
                        email: '',
                        address:{
                            street: '',
                            suite: '',
                            city: '',
                            zipcode: '',
                            geo: {
                                lat: '',
                                lng: ''
                            }
                        },
                        phone: '',
                        website: '',
                        company: {
                            name: '',
                            catchPhrase: '',
                            bs: ''
                        }
                    }
                }
            })
            .catch(() => {
                ElNotification({
                    title: 'Error',
                    message: 'El usuario no se ha podido añadir',
                    type: 'error',
                })
                this.loading = false
            })
        }
    }
}
</script>