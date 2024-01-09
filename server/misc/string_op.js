const maxlengthNo=5;
exports.ara=(string)=> {
  //  console.log('sring=',string)
    return(string)? string
    .split(' ').reverse().join(' '):
    '-';

}
exports.formatNo=(number)=>{
  return (number.length >=maxlengthNo)? number:number.toString().padStart(maxlengthNo, '0');
}