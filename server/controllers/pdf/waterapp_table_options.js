exports.getTableOptions = (table,fontName) => {
    const _struct = {
        x: 0, y: 0,
        padding: 3,
        columnSpacing: 0,
        hideHeader: true,
        minRowHeight: 17,
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            const { x, y, width, height } = rectCell;

            if (indexColumn === 0) {
                table
                    .lineWidth(.5)
                    .moveTo(x, y)
                    .lineTo(x, y + height)
                    .stroke();
            };
            if (indexRow === 0) {
                table// start from (x,y)==>(x+w,y)
                    .lineWidth(.5)
                    .moveTo(x, y)
                    .lineTo(x + width, y)
                    .stroke();
            };

            table// start from (x+w,y)==>(x+w,y+h)
                .lineWidth(.5)
                .moveTo(x + width, y)
                .lineTo(x + width, y + height)
                .stroke();
            table.font(fontName)
                .fontSize(10);
        }
    }
    return _struct;
}

exports.getHeaderOptions = (table,fontName) => {
    const _struct = {
        x: 0,
        y: 0,
        padding: 5,
        columnSpacing: 3,

        hideHeader: true,
        //minRowHeight: 16,

        divider: {
            header: { disabled: true },
            horizontal: { disabled: true, width: 0.1, opacity: 1 },
        },


        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
           

            const { x, y, width, height } = rectCell;

            if (indexColumn === 0) {
                table
                    .lineWidth(.5)
                    .moveTo(x, y)
                    .lineTo(x, y + height)
                    .stroke();
                table// start from (x,y)==>(x+w,y)
                    .lineWidth(.5)
                    .moveTo(x, y)
                    .lineTo(x , y+height*8)
                    .stroke();
            }

            if (indexRow === 0) {
                table// start from (x,y)==>(x+w,y)
                    .lineWidth(.5)
                    .moveTo(x, y)
                    .lineTo(x + width, y)
                    .stroke();
                table// start from (x,y)==>(x+w,y)
                    .lineWidth(.5)
                    .moveTo(x+width, y)
                    .lineTo(x +width, y+height*8)
                    .stroke();
            };
            table
                .lineWidth(.5)
                .moveTo(x + width, y)
                .lineTo(x + width, y + height)
                .stroke();

            table.font(fontName)
                .fontSize(10);
        }
    };
    return _struct;
}