
import ListBox from '@/components/shared/filter-list-box';

interface Props {
    setViewAs: (value: boolean) => void;
    viewAs: boolean;
}

const TopBar: React.FC<Props> = ({setViewAs, viewAs}) => {
    return (
        <>
            <div className="w-full sm:flex items-center justify-between mb-3 filters-panel bg-white  p-2">
                <div className="flex items-center w-full justify-between">
                    <div className="list-view">
                        <div className="btn btn-gridview text-15px">View as:</div>
                        <button type="button" id="grid-5" className={`btn btn-view grid ${viewAs && 'active' || ''}`}
                                onClick={() => setViewAs(!viewAs)}>
                            <div>
                                <div className="icon-bar"></div>
                                <div className="icon-bar"></div>
                                <div className="icon-bar"></div>
                            </div>
                        </button>
                        <button type="button" id="list-view"
                                className={`btn btn-view list ${!viewAs && 'active' || ''}`}
                                onClick={() => setViewAs(!viewAs)}>
                            <div>
                                <div className="icon-bar"></div>
                                <div className="icon-bar"></div>
                                <div className="icon-bar"></div>
                            </div>
                        </button>
                    </div>
                    <ListBox
                        options={[
                            {name: 'New arrival', value: 'new-arrival'},
                            {name: 'Best selling', value: 'best-selling'},
                            {name: 'Lowest price', value: 'lowest'},
                            {name: 'Highest price', value: 'highest'},
                           
                        ]}
                    />
                </div>
                
            </div>
        </>
    
    );
}
export default TopBar;
