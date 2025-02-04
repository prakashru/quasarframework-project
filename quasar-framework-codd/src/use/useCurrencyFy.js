export function useCurrencyfy(amount){
    let posNagSymbol=''
  
    if (amount>0) posNagSymbol='+'
    else if (amount<0) posNagSymbol='-'
  
    const absAmount=Math.abs(amount)
  
    const currencySymbol = '$'
  
    const formattedAmount  =  absAmount.toLocaleString('en-US',{
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return `${ posNagSymbol } ${ currencySymbol } ${ formattedAmount }`
  }