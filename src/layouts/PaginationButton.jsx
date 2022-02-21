import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default function PaginationButton({previous, next, pageContent, pageSize1,pageSize2,pageSize3,pageSize4,pageSizeContent}) {
  return (

    <Grid>
        <Grid.Row columns="2">
            <Grid.Column textAlign='right'>
                <Button circular compact basic disabled color="black" content={pageSizeContent} />
                <Button circular compact color="violet" icon="genderless" onClick={pageSize1} />
                <Button circular compact color="violet" icon="genderless" onClick={pageSize2} />
                <Button circular compact color="violet" icon="genderless" onClick={pageSize3} />
                <Button circular compact color="violet" icon="genderless" onClick={pageSize4} />
            </Grid.Column>
            <Grid.Column textAlign='left'>
                <Button circular compact color="violet" icon="caret left" onClick={previous} />
                <Button circular compact basic disabled color="black" content={pageContent} />
                <Button circular compact color="violet" icon="caret right" onClick={next} />
            </Grid.Column>
        </Grid.Row>
    </Grid>

  );
}
