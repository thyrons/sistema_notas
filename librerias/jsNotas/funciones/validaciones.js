Ext.define('extValidacion.validaciones', {
    cargarValidaciones: function() {
        Ext.apply(Ext.form.VTypes, {
            soloNumero: function(value, field) {
                return /[0-9]/.test(value);
            },
            soloNumeroText: 'Los datos ingresado no son validos. Solo numeros',
            soloNumeroMask: /[0-9]/i,
            
           
            soloLetra: function(value, field) {
                //return /[A-Za-z]/.test(value);
                return /[A-Za-z\s]/.test(value);
                ;
            },
            soloLetraText: 'Datos ingresados no validos. Solo letras',
            soloLetraMask: /[A-Za-z\s]/,
            soloDecimales: function(value, field) {
                //return /[A-Za-z]/.test(value);
                return /^[0-9]*\.?[0-9]*$/.test(value);
                ;
            },
            soloDecimalesText: 'Datos ingresados no validos. Solo Decimales',
            soloDecimalesMask: /^[0-9]*\.?[0-9]*$/,
            soloCedula: function(value, field) {
                //return /[A-Za-z]/.test(value);
                if (value.length <= 10 || value.length === 13) {
                    var cedula = value;

                    var array = cedula.split("");
                    var num = array.length;
                    var ruc = cedula.substr(10, cedula.length);

                    if (num === 10 || num === 13)
                    {
                        var total = 0;
                        var digito = (array[9] * 1);
                        for (var i = 0; i < (num - 1); i++)
                        {
                            var mult = 0;
                            if ((i % 2) !== 0)
                            {
                                total = total + (array[i] * 1);
                            }
                            else
                            {
                                mult = array[i] * 2;
                                if (mult > 9)
                                    total = total + (mult - 9);
                                else
                                    total = total + mult;
                            }

                        }
                        var decena = total / 10;
                        var decena = Math.floor(decena);
                        var decena = (decena + 1) * 10;
                        var final1 = (decena - total);
                        if ((final1 === 10 && digito === 0) || (final1 === digito))
                        {
                            if (ruc === '001' || ruc === '') {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else if (num == 0)
                    {
                        return false
                    }
                    else {
                        return false;
                    }
                    return true;
                }
                else {
                    return false;
                }
            },
            soloCedulaText: 'Cedula Incorrecta',
            soloCedulaMask: /^[0-9]*\.?[0-9]*$/,
        });
    }
});