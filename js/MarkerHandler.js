AFRAME.registerComponent('marker-handler', {
    init: async function () {

        var toys = await this.getToys()

        this.el.addEventListener('markerFound', () => {
            this.handleMarkerFound()
        })

        this.el.addEventListener('markerLost', () => {
            this.handleMarkerLost()
        })
    },

    handleMarkerFound: function(){
        var buttonDiv = document.getElementById('button-div')
        buttonDiv.style.display = 'flex'

        var orderButton = document.getElementById('order-button')
        var orderSummaryButton = document.getElementById('order-summary-button')

        orderButton.addEventListener('click', () => {
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg",
                title: "Thanks For Order !",
                text: "  ",
                timer: 2000,
                buttons: false
            })
        })

        orderSummaryButton.addEventListener('click', () => {
            swal({
                icon: "warning",
                title: "Order Summary",
                text: "Work In Progress"
            })
        })

        var toy = toys.filter(toy => toy.id === marker.id)[0]

        var model = document.querySelector(`#model-${toy.id}`)
        model.setAttribute('position', toy.model_geometry.position)
        model.setAttribute('rotation', toy.model_geometry.rotation)
        model.setAttribute('scale', toy.model_geometry.scale)
    },

    getToys: async function(){
        return await firebase.firestore().collection("toys").get().then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    },

    handleMarkerLost: function(){
        var buttonDiv = document.getElementById('button-div')
        buttonDiv.style.display = 'none'
    }
});
