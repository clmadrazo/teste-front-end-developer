define(['backbone', 'models/baseModel'], function (Backbone, BaseModel) {
    var taskModel = BaseModel.extend({
        data: '',
        label: "Número de Pedidos",
        addPedido: function(data) {
            var pedidos = localstorage.get('pedidos');
            if (pedidos == undefined) {
                localstorage.set('pedidos',new Array());
                pedidos = localstorage.get('pedidos');
            }
            pedidos.push(data);
            localstorage.set('pedidos',pedidos);
            new PNotify({
                title: 'Feito',
                text: "Pedido adicionado com éxito; pedido número "+data.idPedido,
                type: 'sucess',
                hide: true,
                buttons: {closer: true, sticker: true},
                icon: 'fa fa-exclamation-circle'
            });
            router.navigate('dashboard', {trigger: true});
        },
        graficoPedidosSolicitantes: function(){
            var mysql_query = "SELECT s.nome as nome, count(*) as quantidade FROM pedidos p  INNER JOIN solicitantes s ON p.id_solicitante = s.id GROUP BY p.id_solicitante",
                that = this,
                labels = new Array(),
                dados = new Array();
            mysqlQuery(mysql_query, function(response) {
                var obj = JSON.parse(response);
                obj.forEach(function(a) {
                    labels.push(a.nome);
                    dados.push(a.quantidade);
                })
                var pedidos = localstorage.get('pedidos') || new Array();
                for(var i = 0; i < pedidos.length; i++){
                    labels.push(pedidos[i].nome_solicitante);
                    var cont = 0;
                    for(var j = 0; j < pedidos.length; j++){
                        if(pedidos[j].nome_solicitante == pedidos[i].nome_solicitante)
                            cont++;
                    }
                    dados.push(cont);
                }
                var e = $("#chart2");
                Chart.defaults.global.responsive = !0;
                new Chart(e, {
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: that.label,
                            data: dados
                        }]
                    }
                });
            });

        },
        selectTodosPedidos: function() {
            var mysql_query = "SELECT * FROM pedidos",
                that = this;
            mysqlQuery(mysql_query, function(result){
                // mostra o resultado da query
                var obj = JSON.parse(result);
                $('table.pedidos-pendentes tbody').empty();
                obj.forEach(function(a) {
                    $('table.pedidos-pendentes tbody').append('<tr>' +
                            '<td>'+ a.id+'</td>'+
                            '<td>'+ a.data_de_compra.slice(0,10).replace(/(\d{4})\-(\d{2})\-(\d{2})/, "$3/$2/$1")+'</td>'+
                            '<td>'+a.rua+' '+a.numero+', Bairro '+a.bairro+'. Cidade: '+a.cidade+' - '+a.estado+'</td>'+
                        '</tr>');
                });
                var pedidos = localstorage.get('pedidos') || new Array();
                for(var i = 0; i < pedidos.length; i++){
                    $('table.pedidos-pendentes tbody').append('<tr>' +
                        '<td>'+ pedidos[i].idPedido+'</td>'+
                        '<td>'+ pedidos[i].data_compra+'</td>'+
                        '<td>'+pedidos[i].end_entrega+' '+pedidos[i].no_end_entrega+', Bairro '+pedidos[i].bairro_entrega+'. Cidade: '+pedidos[i].cidade_entrega+' - '+pedidos[i].estado_entrega+'</td>'+
                        '</tr>');
                }
            });
        },
        graficoPedidosDia: function() {
            var mysql_query = "SELECT data_de_compra as data, count(*) as quantidade FROM pedidos GROUP BY data_de_compra",
                that = this,
                labels = new Array(),
                dados = new Array();
            mysqlQuery(mysql_query, function(response) {
                var obj = JSON.parse(response);
                    obj.forEach(function(a) {
                        var date = a.data.slice(0,10).replace(/(\d{4})\-(\d{2})\-(\d{2})/, "$3/$2/$1");
                        labels.push(date);
                        dados.push(a.quantidade)
                    });
                var pedidos = localstorage.get('pedidos') || new Array();
                for(var i = 0; i < pedidos.length; i++){
                    labels.push(pedidos[i].data_compra);
                    var cont = 0;
                    for(var j = 0; j < pedidos.length; j++){
                        if(pedidos[j].data_compra == pedidos[i].data_compra)
                            cont++;
                    }
                    dados.push(cont)
                }
                var chart = $("#chart1");
                Chart.defaults.global.responsive = !0;
                new Chart(chart, {
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: that.label,
                            data: dados
                        }]
                    }
                });
                PNotify.removeAll();
            });
        },
        buscaPedido: function(idPedido) {
            var mysql_query = "SELECT * FROM pedidos WHERE id="+idPedido,
                that = this;
            mysqlQuery(mysql_query, function(result){
                // mostra o resultado da query
                var obj = JSON.parse(result);
                if(obj.length == 0) {
                    var pedidos = localstorage.get('pedidos') || new Array(),
                        encontrado = false;
                    if(pedidos.length > 0){
                        for(var i = 0; i <= pedidos.length; i++){
                            var pedido = pedidos[i];
                            if(i == pedidos.length && !encontrado){
                                $('.modal-body .info').text("Não existe o pedido "+idPedido);
                            }
                            else if(i != pedidos.length){
                                if(pedido.idPedido == idPedido){
                                    encontrado = true;
                                    $('.modal-body .info').empty().html(
                                        '<strong>Data do pedido:</strong> '+pedido.data_compra+'<br>'+
                                        '<strong>Destino: </strong>'+
                                        pedido.end_entrega+' '+pedido.no_end_entrega+', Bairro '+pedido.bairro_entrega+'. Cidade: '+pedido.cidade_entrega+' - '+pedido.estado_entrega
                                    );
                                }

                            }
                        }
                    }
                    else
                        $('.modal-body .info').text("Não existe o pedido "+idPedido);
                }
                else {
                    $('.modal-body .info').empty().html(
                        '<strong>Data do pedido:</strong> '+obj[0].data_de_compra.slice(0,10).replace(/(\d{4})\-(\d{2})\-(\d{2})/, "$3/$2/$1")+'<br>'+
                        '<strong>Destino: </strong>'+
                        obj[0].rua+' '+obj[0].numero+', Bairro '+obj[0].bairro+'. Cidade: '+obj[0].cidade+' - '+obj[0].estado
                    );
                }
                $('.pedido').val('');
                PNotify.removeAll();
            });
        },
        parse: function (response) {
            return response.result;
        }
    });

    return taskModel;
});